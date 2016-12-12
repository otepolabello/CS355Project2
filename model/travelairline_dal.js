var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM travel_airline;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(t_email, callback) {
    var query = 'SELECT * FROM travel_airline WHERE t_email = ?';
    var queryData = [t_email];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO travel_airline (t_email, airline_name) VALUES (?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.t_email, params.airline_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(t_email, callback) {
    var query = 'DELETE FROM travel_airline WHERE t_email = ?';
    var queryData = [t_email];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};