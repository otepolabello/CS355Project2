var express = require('express');
var router = express.Router();
var payment_dal = require('../model/payment_dal');


// View All accounts
router.get('/all', function(req, res) {
    payment_dal.getAll(function(err, result){
        if(err) {
            res.send(err);
        }
        else {
            res.render('payment/paymentViewAll', { 'result':result });
        }
    });

});

// View the account for the given id
router.get('/', function(req, res){
    if(req.query.payment_type == null) {
        res.send('payment type is null');
    }
    else {
        payment_dal.getById(req.query.payment_type, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                res.render('payment/paymentViewById', {'result': result});
            }
        });
    }
});

// Return the add a new account form
router.get('/add', function(req, res){
    // passing all the query parameters (req.query) to the insert function instead of each individually
    payment_dal.getAll(function(err,result) {
        if (err) {
            res.send(err);
        }
        else {
            res.render('payment/paymentAdd', {'payment': result});
        }
    });
});

// insert a account record
router.get('/insert', function(req, res){
    // simple validation
    if(req.query.payment_type == null) {
        res.send('Payment type must be provided.');
    }
    else if(req.query.amount == null) {
        res.send('An amount must be selected');
    }
    else {
        // passing all the query parameters (req.query) to the insert function instead of each individually
        payment_dal.insert(req.query, function(err,result) {
            if (err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/payment/all');
            }
        });
    }
});

router.get('/edit2', function(req, res){
    if(req.query.payment_type == null) {
        res.send('An email is required');
    }
    else {
        payment_dal.edit(req.query.payment_type, function(err, result){
            res.render('payment/paymentUpdate', {payment: result[0][0]});
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
    payment_dal.update(req.query, function(err, result){
        res.redirect(302, '/payment/all');
    });
});


// Delete a account for the given email
router.get('/delete', function(req, res){
    if(req.query.payment_type == null) {
        res.send('payment type is null');
    }
    else {
        payment_dal.delete(req.query.payment_type, function(err, result){
            if(err) {
                res.send(err);
            }
            else {
                //poor practice, but we will handle it differently once we start using Ajax
                res.redirect(302, '/payment/all');
            }
        });
    }
});


module.exports = router;
