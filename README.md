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
This line attaches the Pathfinder interface to your express app.

Place this line before your routes/routers/middlewares
```js
app.use('yourCustomPath', pfUI.router)
```

Place this line after all of your routes/routers/middlewares.
```js
pfUI(app);
```
You access the interface by going to localhost:PORT/yourCustomPath

 

## Tests

## Contributing

## Release History

