var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM trip_flight;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(country_name, callback) {
    var query = 'SELECT * FROM trip_flight WHERE country_name = ?';
    var queryData = [country_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO trip_flight (country_name, flight_id) VALUES (?, ?)';
    // var query = 'INSERT INTO trip_flight (country_name) VALUES (?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.country_name, params.flight_id];
    var queryData = [params.country_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(country_name, callback) {
    var query = 'DELETE FROM trip_flight WHERE country_name = ?';
    var queryData = [country_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};