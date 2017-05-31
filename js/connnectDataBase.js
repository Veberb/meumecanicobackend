
var pg = require('pg');
var conString = "postgres://postgres@localhost/tcc";



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


module.exports.insertGarage = function (garage) {
  return query("insert into mymechanic.garage(name, email, cep, born_year, cellphone, description) values ($1,$2,$3,$4,$5,$6) returning *", [garage.name, garage.email, garage.cep, garage.born_year, garage.cellphone, garage.description]);
};

module.exports.insertCustomer = function (customer) {
  return query("insert into mymechanic.customer(name, email, cep, born_year, profession, car, sex, cellphone) values ($1,$2,$3,$4,$5,$6,$7,$8) returning *", [customer.name, customer.email, customer.cep, customer.born_year, customer.profession, customer.car, customer.sex, customer.cellphone]);
};

module.exports.insertUser = function (user) {
  return query("insert into mymechanic.user(id_customer, id_garage, password) values ($1,$2, $3) returning *", [user.id_customer, user.id_garage, user.password]);
};

module.exports.insertReview = function (review) {
  return query("insert into mymechanic.review(id_customer, id_garage, id_review_fk, review) values ($1,$2,$3,$4) returning *", [review.id_customer, review.id_garage, review.id_review_fk, review.review]);
};

module.exports.insertAnswer = function (answer) {
  return query("insert into mymechanic.answer(id_customer, id_review, answer) values ($1,$2, $3) returning *", [review.id_customer, review.id_review, review.answer]);
};

module.exports.findGarage = function (id) {
  var query1 = "select g.id, g.name, g.email, g.cep, g.born_year, g.cellphone, g.description, g.creation_time from mymechanic.garage g where g.id = $1";
  var params = [id];
  return query(query1, params)
};

module.exports.listAllGarage = function () {
  var query1 = "select g.id, g.name, g.email, g.cep, g.born_year, g.cellphone, g.description, g.creation_time from mymechanic.garage g";
  return query(query1, [])
};

module.exports.editGarage = function (garage) {
  console.log("Chegou edit Backend");
  var query1 = "UPDATE mymechanic.garage set name = $1, email = $2, cep = $3, born_year = $4, cellphone = $5, description = $6 where id = $7";
  var params = [garage.name, garage.email, garage.cep, garage.born_year, garage.cellphone, garage.description, garage.id];
  console.log(query1, params);
  return query(query1, params)
};

module.exports.findClient = function (id) {
  console.log("FindClientDataBase");
  var query1 = "select c.id, c.name, c.email, c.cep, c.born_year, c.profession, c.car, c.sex, c.cellphone from mymechanic.customer c where c.id = $1";
  var params = [id];
  return query(query1, params)
};

module.exports.editClient = function (client) {
  console.log("Chegou edit Backend");
  var query1 = "UPDATE mymechanic.customer set name=$1, email =$2, cep =$3, born_year =$4, profession =$5, car =$6, sex =$7, cellphone =$8  where id = $9";
  var params = [client.name, client.email, client.cep, client.born_year, client.profession, client.car, client.sex, client.cellphone, client.id];
  return query(query1, params)
};

module.exports.insertRecomendacao = function (rec) {
  return query("insert into mymechanic.review(id_customer, id_garage, review, grade) values ($1,$2,$3, $4) returning *", [rec.client.id, rec.garage.obj.id, rec.description, rec.grade ]);
};

module.exports.reviewByGarage = function (id) {
  var params = [id];
  var query1 = "select r.creation_time as creation_review, r.creation_time as creation_customer ,* from mymechanic.review r join mymechanic.customer c on r.id_customer = c.id  where r.id_garage = $1";
  return query(query1, params)
};
//r.id, r.id_customer, r.id_garage, r.id_review, r.review, r.creation_time, r.grade
