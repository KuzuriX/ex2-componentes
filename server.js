'use strict';

// server.js (Express 4.0)

// BASE SETUP
// ==============================================

// call the packages we need
let express = require('express'),
		app = express(),
		bodyParser = require('body-parser'),
		mongoose = require('mongoose'),
		dbURI = 'mongodb://localhost/ex2',
		port = process.env.PORT || 8080;

// connect to mongodb
mongoose.connect(dbURI);

// 
let Revista = require('./app/api/models/revista');
let Articulo= require('./app/api/models/articulo');


// DEFINE THE MIDDLEWARE FOR APP
// ==============================================

// configure app to use bodyParser()
// this will let us get data from POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// ROUTES
// ==============================================

// get an instance of the express router
let apiRouter = express.Router();

// test router
// apiRouter.get('/', (req, res) => {
// 	res.json({ message: 'welcome to out api' });
// });

// MIDDLEWARE to use for all requests
apiRouter.use((req, res, next) => {
	// do something before running routes
	console.log('Happening before routes...');
	next();   // don't stop here, go to next route
});

// routes 
// generic root route of the api
apiRouter.get('/', (req, res) => {
	res.json({ message: 'Hello API!' });
});

// on routes that end in /revistas
apiRouter.route('/revistas')
	// create a revista (http://localhost:8080/api/revistas)
	.post((req, res) => {
		let revista = new Revista();

		revista.id = req.body.id;
		revista.name = req.body.name;
		revista.year = req.body.year;
		revista.volume = req.body.volume;

		revista.save(err => {
			if (err) res.send(err);
			res.json({ message: 'Revista creada!' });
		});
	})
	// get all revistas (http://localhost:8080/api/revistas)
	.get((req, res) => {
		Revista.find((err, revistas) => {
			if (err) res.send(err);
			res.json(revistas);
		});
	});

// on routes that end in /revistas/:revista_id
apiRouter.route('/revistas/:revista_id')
	// get a revista by id (http://localhost:8080/api/revistas/:revista_id)
	.get((req, res) => {
		Revista.findById(req.params.revista_id, (err, revista) => {
			if (err) res.send(err);
			res.json(revista);
		});
	})
	// update a revista by id (http://localhost:8080/api/revistas/:revista_id)
	.put((req, res) => {
		Revista.findById(req.params.revista_id, (err, revista) => {
			if (err) res.send(err);
			// update info
			revista.name = req.body.name;
			revista.year = req.body.year;
			revista.volume = req.body.volume;
			// save revista
			revista.save(err => {
				if (err) res.send(err);
				res.json({ message: 'Revista updated!' });
			});
		});
	})
	// delete a revista by id (http://localhost:8080/api/revistas/:revista_id)
	.delete((req, res) => {
		Revista.remove({ _id: req.params.revista_id }, (err, revista) => {
			if (err) res.send(err);
			res.json({ message: 'Successfully deleted!'});
		});
	});



//////////////////////////////////////////////////////////////////////////
// routes -articulos
// generic root route of the api
apiRouter.get('/', (req, res) => {
	res.json({ message: 'Hello API!' });
});

// on routes that end in /articulos
apiRouter.route('/articulos')
	// create a articulo (http://localhost:8080/api/articulos)
	.post((req, res) => {
			let articulo = new Articulo();
			articulo.name = req.body.name;
			articulo.tittle = req.body.tittle;
			articulo.id_rev = req.body.id_rev;
			articulo.save(err => {
					if (err) res.send(err);
						res.json({ message: 'Articulo created!' });
					});
		})
	// get all articulos (http://localhost:8080/api/articulos)
		.get((req, res) => {
			Articulo.find((err, articulos) => {
					if (err) res.send(err);
					res.json(articulos);
			});
		});

//articulos aprox search
apiRouter.route('/articulos/query')
	.get((req,res)=> {
		let articuloString = req.query.articulo;
		Articulo.find({"tittle":{"$regex": articuloString}},(err,articulo) => {
			if (err) res.send(err);
			res.json(articulos);
		})
	});



// on routes that end in /articulos/:articulo_id
apiRouter.route('/articulos/:articulo_id')
	// get a articulo by id (http://localhost:8080/api/articulos/:articulo_id)
	.get((req, res) => {
	Articulo.findById(req.params.articulo_id, (err, articulo) => {
	if (err) res.send(err);
res.json(articulo);
});
})
// update a articulos by id (http://localhost:8080/api/articulos/:articulo_id)
.put((req, res) => {
	Articulo.findById(req.params.articulo_id, (err, articulo) => {
	if (err) res.send(err);
// update info
			articulo.name = req.body.name;
			articulo.tittle = req.body.tittle;
			articulo.id_rev = req.body.id_rev;
// save articulo
articulo.save(err => {
	if (err) res.send(err);
res.json({ message: 'Articulo updated!' });
});
});
})




// register our routes
// all routes will be prefixed with /api
app.use('/api', apiRouter);



// START THE SERVER
// ==============================================
app.listen(port);
console.log('Magic happens on port ' + port);