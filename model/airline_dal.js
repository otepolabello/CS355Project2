var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM airline;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(airline_name, callback) {
    var query = 'SELECT * FROM airline WHERE airline_name = ?';
    var queryData = [airline_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO airline (airline_name, flight_type) VALUES (?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.airline_name, params.flight_type];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(airline_name, callback) {
    var query = 'DELETE FROM airline WHERE airline_name = ?';
    var queryData = [airline_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};