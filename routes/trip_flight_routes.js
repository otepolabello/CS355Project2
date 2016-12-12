var express = require('express');
var router = express.Router();
var trip_flight_dal = require('../model/trip_flight_dal');


// View All accounts
router.get('/all', function(req, res) {
    trip_flight_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('trip_flight/trip_flightViewAll', { 'result':result });
        }
    });

});

// View the account for the given id
router.get('/', function(req, res){
    if(req.query.country_name == null) {
        res.send('country_name is null');
    }
    else {
        trip_flight_dal.getById(req.query.country_name, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('trip_flight/trip_flightViewById', {'result': result});
            }
        });
    }
});

// Return the add a new account form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    trip_flight_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('trip/trip_flightAdd', {'trip': result});
        }
    });
});

// insert a account record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.country_name == null) {
        res.send('A country name must be provided.');
    }
    else if(req.query.flight_id == null) {
        res.send('A flight id must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        trip_flight_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/trip_flight/all');
            }
        });
    }
});

// Delete a account for the given email
router.get('/delete', function(req, res){
    if(req.query.country_name == null) {
        res.send('country name is null');
    }
    else {
        trip_flight_dal.delete(req.query.country_name, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/trip_flight/all');
            }
        });
    }
});


module.exports = router;
