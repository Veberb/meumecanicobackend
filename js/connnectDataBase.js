
var pg = require('pg');
var conString = "postgres://postgres:6587847@localhost/tcc";



  var query = function (sql, params) {
    return new Promise(function (resolve, reject) {
      pg.connect(conString, function (err, client, done) {
        if (err) {
        console.log(err);
        };
        var query = client.query(sql, params);

        var rows = [];

        query.on('error', function (err) {
          done();
          console.log(sql + ' -> ' + params);
          console.log(err);
          reject(err);
        });

        query.on('row', function (row) {
         rows.push(row);
        });

        query.on('end', function (result) {
          done();
        resolve(rows);
        });
      });
    });
  };

  module.exports.insert= function(oficina){
    var query1 = "INSERT INTO oficina(nome, descricao) VALUES($1,$2)";
    var params = [oficina.nome, oficina.descricao];
    return query(query1, params)
  };


  module.exports.deleteCheque = function(cheque){
    var query1 = "DELETE from cheque where nr_cheque = $1";
    var params = [cheque.nr_cheque];
    return query(query1, params)
  };

  module.exports.updateCheque = function(cheque){
    var query1 = "UPDATE cheque set dt_cheque = $1 , nr_pessoa = $2 where nr_cheque = $3";
    var params = [cheque.dt_cheque, cheque.nr_pessoa, cheque.nr_cheque];
    query(query1, params).then(function (result) {
      console.log("Editado com Sucesso");
    }).catch(function(error) {
       console.log(error);
      });
  };

  module.exports.consultaCheque = function(cheque){
    var query1 = "select * from cheque where nr_pessoa = $1";
    var params = [cheque.nr_pessoa];
    query(query1, params).then(function (result) {
      console.log(result);
    }).catch(function(error) {
       console.log(error);
      });
  };

  module.exports.insertPessoa = function(pessoa){
    var query1 = "INSERT INTO pessoa(nm_pessoa, pct) VALUES($1,$2)";
    var params = [pessoa.nmPessoa, pessoa.pct];
    return query(query1, params)
  };


  module.exports.deletaPessoa = function(pessoa){
    var query1 = "DELETE from pessoa where nr_pessoa = $1";
    var params = [pessoa.nr_pessoa];
    return query(query1, params)
  };

  module.exports.listAll = function(){
    var query1 = "select c.dt_cheque, c.nr_cheque, p.nm_pessoa, p.pct, c.vl_cheque, c.vl_receber from cheque c, pessoa p where c.nr_pessoa = p.nr_pessoa";
    return query(query1, [])
  };

  module.exports.listCliente = function(){
    var query1 = "select * from pessoa"
    return query(query1, [])
  }
