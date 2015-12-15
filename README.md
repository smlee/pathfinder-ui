#Pathfinder-UI

Pathfinder-UI is a tool that allows you to visualize and test the routes in an express application.	

![Pathfinder Screenshot](https://s3.amazonaws.com/poly-screenshots.angel.co/Project/4b/154634/8a313313182b2bab4b0e00f483f647b7-original.png)

## Installation

NPM install the module.

```bash
  npm install pathfinder-ui --save
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

You access the interface by going to localhost:PORT/pathfinder in your browser.

<!-- ## Tests

## Contributing

## Release History

 -->
