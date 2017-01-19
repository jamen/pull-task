var pull = require('pull-stream')
var each = require('async-each')
function noop () {}

module.exports = task
task.run = run

// Where tasks are stored:
task.tasks = {}

function task (name, deps, line) {
  if (!line && typeof deps[0] !== 'string') line = deps, deps = null
  task.tasks[name] = {
    name: name,
    deps: deps,
    line: line
  }
}

function run (name, done, _previous) {
  if (!done) done = noop
  var ran = _previous || {}

  if (Array.isArray(name)) {
    return each(name, function (select, next) {
      run(select, next, ran)
    }, done)
  }

  var main = task.tasks[name]
  var line = main.line && main.line.slice(0)
  var deps = main.deps

  // Stream for detecting when pipeline ends:
  if (line) {
    line.splice(line.length - 2, 0, function (read) {
      return function (end, cb) {
        read(end, function (end, data) {
          // Detect pipeline end
          if (end) {
            done(end === true ? null : end, main)
            ran[main.name] = true
          }
          // Pass through
          cb(end, data)
        })
      }
    })
  }

  // Run dependencies:
  if (deps && deps.length) {
    return run(deps, function (err) {
      if (err) return done(err, main)
      if (line) pull.apply(null, line)
      else done(err, main)
    }, ran)
  } else if (line && !ran[name]) {
    pull.apply(null, line)
  } else {
    done(null, main)
  }
}
