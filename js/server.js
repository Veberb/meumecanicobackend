var express = require("express");
var app = express();
var banco = require("./connnectDataBase.js");
var bodyParser = require('body-parser');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

	//res.send(banco.listAll());
app.post('/insert', function(req, res){
	var oficina = req.body;
	banco.insert(oficina).then(function(resultado){
		console.log(req);
		res.send(resultado) ;
	})
});

app.get('/consultaCliente', function(req, res){
	banco.listCliente().then(function(resultado){
		res.send(resultado) ;
	})
});

app.post('/adicionarCheques', function(req, res){
	var newCheque = req.body;
	banco.insertCheque(newCheque).then(function(resultado){
		res.send(resultado) ;
	})
});

app.post('/deletaCheque', function(req, res){
	var delCheque = req.body;
	banco.deleteCheque(delCheque).then(function(resultado){
		res.send(resultado) ;
	})
});

app.post('/adicionaPessoa', function(req, res){
	var newPessoa = req.body;
	banco.insertPessoa(newPessoa).then(function(resultado){
		res.send(resultado) ;
	})
});

app.post('/deletaPessoa', function(req, res){
	var delPessoa = req.body;
	banco.deletaPessoa(delPessoa).then(function(resultado){
		res.send(resultado) ;
	})
});


var server = app.listen(8081, function(){
	var host = server.address().address
	var port = server.address().port

	console.log(host);
	console.log(port);
});


