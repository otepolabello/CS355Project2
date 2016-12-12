var express = require('express');
var router = express.Router();
var travel_dal = require('../model/travel_dal');


// View All accounts
router.get('/all', function(req, res) {
    travel_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('travel/travelViewAll', { 'result':result });
        }
    });

});

// View the account for the given id
router.get('/', function(req, res){
    if(req.query.email == null) {
        res.send('email is null');
    }
    else {
        travel_dal.getById(req.query.email, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('travel/travelViewById', {'result': result});
            }
        });
    }
});

// Return the add a new account form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    travel_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('travel/travelAdd', {'travel': result});
        }
    });
});

// insert a account record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.email == null) {
        res.send('Email must be provided.');
    }
    else if(req.query.agency_name == null) {
        res.send('An agency name must be selected');
    }
    else if(req.query.address == null) {
        res.send('An address must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        travel_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/travel/all');
            }
        });
    }
});

// Delete a account for the given email
router.get('/delete', function(req, res){
    if(req.query.email == null) {
        res.send('email is null');
    }
    else {
        travel_dal.delete(req.query.email, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/travel/all');
            }
        });
    }
});


module.exports = router;
