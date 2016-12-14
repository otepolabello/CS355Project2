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

exports.update = function(params, callback) {
    var query = 'UPDATE payment SET payment_type = ?, amount = ? WHERE payment_type = ?';
    var queryData = [params.payment_type, params.amount];

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

exports.edit = function(payment_type, callback) {
    var query = 'CALL payment_getinfo(?)';
    var queryData = [payment_type];

    connection.query(query, queryData, function(err, result) {
        callback(err, result);
    });
};