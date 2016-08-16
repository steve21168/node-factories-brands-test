var express = require('express');
var companiesStore = require('json-fs-store')('store/companies');
var router = express.Router();

/* GET a list of factories */
router.get('/', function(req, res, next) {
    companiesStore.list(function(err, factories) {
        if (err) throw err;
        var factoriesList = []
        factories.forEach(function(factory) {
          if (factory.company_type === "factory") {
            factoriesList.push(factory)
          }
        })
        res.json(factoriesList)
    });
});
router.get('/:id', function(req, res, next) {
    companiesStore.load(req.params.id, function(err, factory) {
        if (err) throw err;

        res.json(factory);
    });
});
router.post('/', function(req, res, next) {
    if (!req.body) return res.sendStatus(400);

    var newFactory = {
        name: req.body.name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        city: req.body.city,
        state: req.body.state
    };
    companiesStore.add(newFactory, function(err) {
        if (err) throw err;

        res.json(newFactory);
    });
});

module.exports = router;
