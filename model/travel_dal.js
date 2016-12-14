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
    var query = 'INSERT INTO travel_agency (email, agency_name, address_id) VALUES (?, ?, ?)';

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

exports.update = function(params, callback) {
    var query = 'UPDATE travel SET agency_name = ?, address_id = ? WHERE email = ?';
    var queryData = [params.agency_name, params.address_id, params.email];

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

exports.edit = function(email, callback) {
    var query = 'CALL travel_getinfo(?)';
    var queryData = [email];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};