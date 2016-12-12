var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM payment;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(payment_type, callback) {
    var query = 'SELECT * FROM payment WHERE payment_type = ?';
    var queryData = [payment_type];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO payment (payment_type, amount) VALUES (?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.email, params.agency_name, params.address];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(payment_type, callback) {
    var query = 'DELETE FROM payment WHERE payment_type = ?';
    var queryData = [payment_type];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};