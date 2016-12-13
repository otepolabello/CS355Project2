var express = require('express');
var router = express.Router();
var travelclient_dal = require('../model/travelclient_dal');


// View All accounts
router.get('/all', function(req, res) {
    travelclient_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('travelclient/travelclientViewAll', { 'result':result });
        }
    });

});

// View the account for the given id
router.get('/', function(req, res){
    if(req.query.t_email == null) {
        res.send('travel email is null');
    }
    else {
        travelclient_dal.getById(req.query.t_email, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('travelclient/travelclientViewById', {'result': result});
            }
        });
    }
});

// Return the add a new account form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    travelclient_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('travelclient/travelclientAdd', {'travelclient': result});
        }
    });
});

// insert a account record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.t_email == null) {
        res.send('Travel email must be provided.');
    }
    else if(req.query.agency_name == null) {
        res.send('Client email must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        travelclient_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/travelclient/all');
            }
        });
    }
});

// Delete a account for the given email
router.get('/delete', function(req, res){
    if(req.query.t_email == null) {
        res.send('Travel email is null');
    }
    else {
        travelclient_dal.delete(req.query.t_email, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/travelclient/all');
            }
        });
    }
});


module.exports = router;