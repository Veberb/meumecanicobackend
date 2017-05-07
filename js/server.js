const express = require("express");
const app = express();
const banco = require("./connnectDataBase.js");
const bodyParser = require('body-parser');

app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/', require('./route/sessionRoute'));

app.post('/insert/garage', function(req, res){
	var garage = req.body;
	banco.insertGarage(garage).then(function(result){
		result = result[0];
		var user = {};
		user.id_garage = result.id;
		user.password = garage.password;
		banco.insertUser(user).then(function(result){
			res.send(user);
		})
	})
});

app.post('/insert/customer', function(req, res){
	var customer = req.body;
	banco.insertCustomer(customer).then(function(result){
		result = result[0];
		var user = {};
		user.id_customer = result.id;
		user.password = customer.password;
		banco.insertUser(user).then(function(result){
			res.send(user);
		})
	})
});

app.get('/consultaCliente', function(req, res){
	banco.listCliente().then(function(resultado){
		res.send(resultado) ;
	})
});

app.post('/adicionarCheques', function(req, res){
	const newCheque = req.body;
	banco.insertCheque(newCheque).then(function(resultado){
		res.send(resultado) ;
	})
});

app.post('/deletaCheque', function(req, res){
	const delCheque = req.body;
	banco.deleteCheque(delCheque).then(function(resultado){
		res.send(resultado) ;
	})
});

app.post('/adicionaPessoa', function(req, res){
	const newPessoa = req.body;
	banco.insertPessoa(newPessoa).then(function(resultado){
		res.send(resultado) ;
	})
});

app.post('/deletaPessoa', function(req, res){
	const delPessoa = req.body;
	banco.deletaPessoa(delPessoa).then(function(resultado){
		res.send(resultado) ;
	})
});


const server = app.listen(8081, function () {
	console.log("meuMecanico rodando em modo desenvolvimento no ip: ", server.address().address, " e na porta", server.address().port);
});
