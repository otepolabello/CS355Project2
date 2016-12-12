var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM flight;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(arrival_city, callback) {
    var query = 'SELECT * FROM flight WHERE arrival_city = ?';
    var queryData = [arrival_city];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO flight (arrival_city, departure_city, price, arrival_time, departure_time) VALUES (?, ?, ?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.arrival_city, params.departure_city, params.price, params.arrival_time, params.departure_time];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(arrival_city, callback) {
    var query = 'DELETE FROM flight WHERE arrival_city = ?';
    var queryData = [arrival_city];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};