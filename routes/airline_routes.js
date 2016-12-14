var express = require('express');
var router = express.Router();
var airline_dal = require('../model/airline_dal');


// View All accounts
router.get('/all', function(req, res) {
    airline_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('airline/airlineViewAll', { 'result':result });
        }
    });

});

// View the account for the given id
router.get('/', function(req, res){
    if(req.query.airline_name == null) {
        res.send('airline_name is null');
    }
    else {
        airline_dal.getById(req.query.airline_name, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('airline/airlineViewById', {'result': result});
            }
        });
    }
});

// Return the add a new account form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    airline_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('airline/airlineAdd', {'airline': result});
        }
    });
});

// insert a account record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.airline_name == null) {
        res.send('Airline name must be provided.');
    }
    else if(req.query.flight_type == null) {
        res.send('A flight type must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        airline_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/airline/all');
            }
        });
    }
});

router.get('/edit2', function(req, res){
    if(req.query.airline_name == null) {
        res.send('An airline name is required');
    }
    else {
        airline_dal.edit(req.query.airline_name, function(err, result){
            res.render('airline/airlineUpdate', {airline: result[0][0]});
        });
    }

});

// router.get('/edit2', function(req, res){
//     if(req.query.airline_name == null) {
//         res.send('An airline name is required');
//     }
//     else {
//         airline_dal.getById(req.query.airline_name, function(err, airline){
//             address_dal.getAll(function(err, address) {
//                 res.render('airline/airlineUpdate', {school: airline[0], address: address});
//             });
//         });
//     }
//
// });

router.get('/update', function(req, res){
    airline_dal.update(req.query, function(err, result){
        res.redirect(302, '/airline/all');
    });
});



// Delete a account for the given email
router.get('/delete', function(req, res){
    if(req.query.airline_name == null) {
        res.send('airline name is null');
    }
    else {
        airline_dal.delete(req.query.airline_name, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/airline/all');
            }
        });
    }
});


module.exports = router;
