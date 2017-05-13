const pg = require('pg');
const co = require('co');
const Pool = require('pg-pool');

const poolConfig = {
    user: "postgres",
    database: "tcc",
    password: 123456,
    host: "localhost",
    port: "5432",
    max: 5,
    idleTimeoutMillis: 30000
};

const pool = new Pool(poolConfig);

const get = co.wrap(function* (sql, params) {
    const rows = yield query(sql, params);
    return rows[0];
});

const query = function(sql, params) {
    return new Promise(function(resolve, reject) {
        pool.connect(function(err, client, done) {
            if (err) {
                console.error(err);
                reject(e);
            }
            const query = client.query(sql, params);
            const rows = [];
            query.on('error', function(e) {
                done();
                console.error(sql + ' -> ' + params);
                reject(e);
            });
            query.on('row', function(row) {
                rows.push(row);
            });
            query.on('end', function(result) {
                done();
                resolve(rows);
            });
        });
    });
};

pool.on('error', function(err, client) {
    logger.error('idle client error', err.message, err.stack);
});

module.exports = {
    query: query,
    get: get
};
