Pathfinder-UI

=========

Pathfinder-UI is a tool that allows you to visualize and test the routes in an express application.

## Installation

```bash
  npm install pathfinder-ui --save
 ```

## Usage
```js
var pfUI = require('pathfinder-ui')
```
Place this line before your routes/routers/middlewares
```js
app.use('yourCustomPath', pfUI.router)
```
Place this line after all of your routes/routers/middlewares.
```js
pfUI(app);
```

 

## Tests

  Blah blah blah blah ipsum lorsomething dolor darmok and jalad at tanagra

## Contributing

Blah blah blah blah ipsum lorsomething dolor darmok and jalad at tanagra.

## Release History

* 0.0.0 some version title stuff
