const express = require("express");
const app = express();
const banco = require("./connnectDataBase.js");
const bodyParser = require('body-parser');
const sessionService = require('./service/sessionService.js');
const co = require("co");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.all('*', function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token");
	next();
});

app.options('*', function (req, res, next) {
	res.end();
});

app.use('/', require('./route/sessionRoute'));
app.use('/', sessionService.isAuthenticated, require('./route/garageRoute'));

app.post('/insert/garage', function (req, res) {
	var garage = req.body;
	banco.insertGarage(garage).then(function (result) {
		result = result[0];
		var user = {};
		user.id_garage = result.id;
		user.password = garage.password;
		banco.insertUser(user).then(function (result) {
			res.send(user);
		})
	})
});

app.post('/insert/customer', function (req, res) {
	var customer = req.body;
	banco.insertCustomer(customer).then(function (result) {
		result = result[0];
		var user = {};
		user.id_customer = result.id;
		user.password = customer.password;
		banco.insertUser(user).then(function (result) {
			res.send(user);
		})
	})
});

app.get('/garage/listAll', function (req, res) {
	return co(function* () {
		const garages = yield banco.listAllGarage();
		for (let garage of garages){
			const reviews = yield  banco.reviewByGarage(garage.id);
			let media = 0;
			for(let review of reviews){
				media += review.grade;
			}
			garage.media = media / reviews.length;
		}
		res.json(garages);
	});

});

app.get('/garage/findGarage', function (req, res) {
	var id = req.user.id;
	banco.findGarage(id).then(function (resultado) {
		res.send(resultado);
	})
});

app.post('/garage/editGarage', function (req, res) {
	var garage = req.body;
	garage.id = req.user.id;
	banco.editGarage(garage).then(function (result) {
		res.send(result);
		/*		banco.insertUser(user).then(function (result) {
					res.send(user);
				})*/
	})
});

app.post('/client/editClient', function (req, res) {
	var client = req.body;
	client.id = req.user.id;
	banco.editClient(client).then(function (result) {
		res.send(result);
	})
});

app.get('/client/findClient', function (req, res) {
	var id = req.user.id;
	console.log("****", id);
	banco.findClient(id).then(function (resultado) {
		res.send(resultado);
	})
});

app.post('/recomendacao/cadastro', function (req, res) {
	var params = req.body;
	console.log("AQQQQQ", params);
	banco.insertRecomendacao(params).then(function (result) {
		console.log("Result: ", result);
	})
});

app.post('/recomendacao/reviewByGarage', function (req, res) {
	var id = req.body.id;
	banco.reviewByGarage(id).then(function (resultado) {
		res.send(resultado);
	})
});

app.post('/recomendacao/reviewByClient', function (req, res) {
	var id = req.user.id;
	banco.reviewByClient(id).then(function (resultado) {
		res.send(resultado);
	})
});

app.post('/garage/findGarageById', function (req, res) {
	console.log("redqqwe: ", req.body.id);
	var id = req.body.id;
	banco.findGarage(id).then(function (result) {
		res.send(result);
	})
});

const server = app.listen(8081, function () {
	console.log("meuMecanico rodando em modo desenvolvimento no ip: ", server.address().address, " e na porta", server.address().port);
});
