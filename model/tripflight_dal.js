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

exports.update = function(params, callback) {
    var query = 'UPDATE trip_flight SET country_name = ? WHERE flight_id = ?';
    var queryData = [params.country_name, params.flight_id];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};

/*  Stored procedure used in this example
 DROP PROCEDURE IF EXISTS school_getinfo;
 DELIMITER //
 CREATE PROCEDURE school_getinfo (school_id int)
 BEGIN
 SELECT * FROM school WHERE school_id = school_id;
 SELECT a.*, school_id FROM address a
 LEFT JOIN school s on s.address_id = a.address_id;
 END //
 DELIMITER ;
 # Call the Stored Procedure
 CALL school_getinfo (4);
 */

exports.edit = function(country_name, callback) {
    var query = 'CALL travel_getinfo(?)';
    var queryData = [country_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};