var express = require('express');
var router = express.Router();
var flight_dal = require('../model/flight_dal');


// View All accounts
router.get('/all', function(req, res) {
    flight_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('flight/flightViewAll', { 'result':result });
        }
    });

});

// View the account for the given id
router.get('/', function(req, res){
    if(req.query.arrival_city == null) {
        res.send('arrival_city is null');
    }
    else {
        flight_dal.getById(req.query.arrival_city, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('flight/flightViewById', {'result': result});
            }
        });
    }
});

// Return the add a new account form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    flight_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('flight/flightAdd', {'flight': result});
        }
    });
});

// insert a account record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.arrival_city == null) {
        res.send('An arrival city must be selected');
    }
    else if(req.query.departure_city == null) {
        res.send('A departure city must be selected');
    }
    else if(req.query.price == null) {
        res.send('A price must be selected');
    }
    else if(req.query.arrival_time == null) {
        res.send('An arrival time must be selected');
    }
    else if(req.query.departure_time == null) {
        res.send('A departure time must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        flight_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/flight/all');
            }
        });
    }
});

// Delete a account for the given email
router.get('/delete', function(req, res){
    if(req.query.arrival_city == null) {
        res.send('arrival_city is null');
    }
    else {
        flight_dal.delete(req.query.arrival_city, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/flight/all');
            }
        });
    }
});


module.exports = router;
