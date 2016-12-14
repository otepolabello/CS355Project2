var express = require('express');
var router = express.Router();
var trip_dal = require('../model/trip_dal');


// View All accounts
router.get('/all', function(req, res) {
    trip_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('trip/tripViewAll', { 'result':result });
        }
    });

});

// View the account for the given id
router.get('/', function(req, res){
    if(req.query.country_name == null) {
        res.send('country name is null');
    }
    else {
        trip_dal.getById(req.query.country_name, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('trip/tripViewById', {'result': result});
            }
        });
    }
});

// Return the add a new account form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    trip_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('trip/tripAdd', {'trip': result});
        }
    });
});

// insert a account record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.country_name == null) {
        res.send('A country name must be provided.');
    }
    else if(req.query.country_id == null) {
        res.send('A country id must be selected');
    }
    else if(req.query.trip_number == null) {
        res.send('A trip number must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        trip_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/trip/all');
            }
        });
    }
});

router.get('/edit', function(req, res){
    if(req.query.country_name == null) {
        res.send('An email is required');
    }
    else {
        trip_dal.edit(req.query.country_name, function(err, result){
            res.render('trip/tripUpdate', {trip: result[0][0]});
        });
    }

});

// router.get('/edit2', function(req, res){
//     if(req.query.email == null) {
//         res.send('An email is required');
//     }
// /    else {
//         travel_dal.getById(req.query.email, function(err, travel){
//             address_dal.getAll(function(err, address) {
//                 res.render('travel/travelUpdate', {school: travel[0], address: address});
//             }/);
//         });
//     }
//
// });

router.get('/update', function(req, res){
    trip_dal.update(req.query, function(err, result){
        res.redirect(302, '/trip/all');
    });
});


// Delete a account for the given email
router.get('/delete', function(req, res){
    if(req.query.country_name == null) {
        res.send('country name is null');
    }
    else {
        trip_dal.delete(req.query.country_name, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/trip/all');
            }
        });
    }
});


module.exports = router;
