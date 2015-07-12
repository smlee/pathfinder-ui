Pathfinder-UI

=========

Pathfinder-UI is a tool that allows you to visualize and test the routes in an express application.

## Installation

```bash
  npm install pathfinder-ui --save
 ```

 NPM install the module.

## Usage

```js
var pathfinderUI = require('pathfinder-ui')
```

Require the module in your app.

```js
app.use('yourCustomPath', pathfinderUI.router)
app.use('/foo', barmiddleware )
app.get('/*', foo)
```

Put the pathfinder-ui routing middleware before your routes.

```js
app.use('/foo', barmiddleware )
app.get('/*', foo)
pathfinderUI(app);
```

This function grabs your express routes and passes the data into the module.
Put this line after all of your routes/routers/middlewares.

You access the interface by going to localhost:PORT/yourCustomPath

<!-- ## Tests

## Contributing

## Release History

 -->