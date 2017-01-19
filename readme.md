# pull-task

> A task system for pull-streams

## Installation

```sh
$ npm install --save pull-task
```

## Usage

### `task(name, [deps], [stream])`

Create a task that runs the stream after running any tasks it depends on.

 - `name` (`String`): Name of the task.
 - `deps` (`Array`): Tasks to execute before.
 - `stream` (`Array`): A pull-stream chain associated with the task.

```js
// Normal task:
task('foo', [
  vinyl.read('./**/*.js'),
  // ...
  vinyl.write('out')
])

// Task with dependencies:
task('bar', ['foo'], [
  // ...
])

// A wrapping task:
task('qux', ['foo', 'bar'])
```

### `task.run(name, [done])`

Run a task and any dependency tasks it has.

 - `name` (`String`): A name (or array of names) of the task to run.
 - `done` (`Function`): A completion callback.  Receives `(err, task || tasks)`

```js
task.run('foo', function (err, task) {
  // ...
})

task.run(['foo', 'bar', 'qux'], function (err, tasks) {
  // ...
})
```

## License

MIT © [Jamen Marz](https://git.io/jamen)

---

[![version](https://img.shields.io/npm/v/pull-task.svg?style=flat-square)][package] [![travis](https://img.shields.io/travis/jamen/pull-task.svg?style=flat-square)](https://travis-ci.org/jamen/pull-task) [![downloads](https://img.shields.io/npm/dt/pull-task.svg?style=flat-square)][package] [![license](https://img.shields.io/npm/l/pull-task.svg?style=flat-square)][package] [![support me](https://img.shields.io/badge/support%20me-paypal-green.svg?style=flat-square)](https://paypal.me/jamenmarz/5usd) [![follow](https://img.shields.io/github/followers/jamen.svg?style=social&label=Follow)](https://github.com/jamen)

[package]: https://npmjs.org/package/pull-task
