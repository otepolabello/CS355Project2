var express = require('express');
var router = express.Router();
var travelairline_dal = require('../model/travelairline_dal');


// View All accounts
router.get('/all', function(req, res) {
    travelairline_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('travelairline/travelairlineViewAll', { 'result':result });
        }
    });

});

// View the account for the given id
router.get('/', function(req, res){
    if(req.query.t_email == null) {
        res.send('travel email is null');
    }
    else {
        travelairline_dal.getById(req.query.t_email, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('travelairline/travelairlineViewById', {'result': result});
            }
        });
    }
});

// Return the add a new account form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    travelairline_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('travelairline/travelairlineAdd', {'travelairline': result});
        }
    });
});

// insert a account record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.t_email == null) {
        res.send('Email must be provided.');
    }
    else if(req.query.airline_name == null) {
        res.send('An airline name must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        travelairline_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/travelairline/all');
            }
        });
    }
});

router.get('/edit2', function(req, res){
    if(req.query.t_email == null) {
        res.send('A travel email is required');
    }
    else {
        travelairline_dal.edit(req.query.t_email, function(err, result){
            res.render('travelairline/travelairlineUpdate', {travelairline: result[0][0]});
        });
    }

});

// router.get('/edit2', function(req, res){
//     if(req.query.email == null) {
//         res.send('An email is required');
//     }
//     else {
//         travel_dal.getById(req.query.email, function(err, travel){
//             address_dal.getAll(function(err, address) {
//                 res.render('travel/travelUpdate', {school: travel[0], address: address});
//             });
//         });
//     }
//
// });

router.get('/update', function(req, res){
    travelairline_dal.update(req.query, function(err, result){
        res.redirect(302, '/travelairline/all');
    });
});


// Delete a account for the given email
router.get('/delete', function(req, res){
    if(req.query.t_email == null) {
        res.send('travel email is null');
    }
    else {
        travelairline_dal.delete(req.query.t_email, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/travelairline/all');
            }
        });
    }
});


module.exports = router;
