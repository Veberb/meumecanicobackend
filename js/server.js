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

app.post('/insert', function(req, res){
	const oficina = req.body;
	banco.insert(oficina).then(function(resultado){
		res.send(resultado) ;
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
