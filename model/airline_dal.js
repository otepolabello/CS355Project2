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

exports.update = function(params, callback) {
    var query = 'UPDATE airline SET flight_id = ? WHERE airline_name = ?';
    var queryData = [params.flight_id, params.airline_name];

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

//Do you have to use airline get info??
exports.edit = function(airline_name, callback) {
    var query = 'CALL airline_getinfo(?)';
    var queryData = [airline_name];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};