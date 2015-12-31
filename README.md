# Pathfinder-UI

Pathfinder-UI is a tool that allows you to visualize and test the routes in an Express application.
### Interactive Tree View
![View Routes As Tree](https://s3.amazonaws.com/poly-screenshots.angel.co/Project/4b/154634/8a313313182b2bab4b0e00f483f647b7-original.png)

### Table View
![View Routes As Table](https://s3.amazonaws.com/poly-screenshots.angel.co/Project/4b/154634/8b4aff1d7a5b7a648773bd7915b19791-original.png)

## Installation

NPM install the module.

```bash
  npm install pathfinder-ui --save-dev
```


## Usage

Require the module in your app.
```js
var pathfinderUI = require('pathfinder-ui')
```

Put our pathfinder-ui routing where you keep your middleware.

```js
app.use('/pathfinder', function(req, res, next){
	pathfinderUI(app)
	next()
}, pathfinderUI.router)
```

pathfinderUI(app) grabs your express routes and passes the data into the pathfinder module.

You access the interface by going to localhost:PORT/pathfinder

<!-- ## Tests

## Contributing

## Release History

 -->
