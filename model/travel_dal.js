var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.getAll = function(callback) {
    var query = 'SELECT * FROM travel_agency;';

    connection.query(query, function(err, result) {
        callback(err, result);
    });
};

exports.getById = function(email, callback) {
    var query = 'SELECT * FROM travel_agency WHERE email = ?';
    var queryData = [email];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

exports.insert = function(params, callback) {
    var query = 'INSERT INTO travel_agency (email, agency_name, address) VALUES (?, ?, ?)';

    // the question marks in the sql query above will be replaced by the values of the
    // the data in queryData
    var queryData = [params.email, params.agency_name, params.address];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};

exports.delete = function(email, callback) {
    var query = 'DELETE FROM travel_agency WHERE email = ?';
    var queryData = [email];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });

};