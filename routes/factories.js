var express = require('express');
var companiesStore = require('json-fs-store')('store/companies');
var router = express.Router();

/* GET a list of factories */
router.get('/', function(req, res, next) {
    companiesStore.list(function(err, factories) {
        if (err) throw err;
        let factoriesList = []
        factories.forEach((factory) => {
          if (factory.company_type === "factory") {
            factoriesList.push(factory)
          }
        })
        res.json(factoriesList)
    });
});
router.get('/:id', function(req, res, next) {
    companiesStore.load(req.params.id, function(err, factory) {
      if (err || factory.company_type !== "factory") {
        throw err
      } else {
        res.json(factory);
      }
    });
});
router.post('/', function(req, res, next) {
    if (!req.body) return res.sendStatus(400);

    let newFactory = {
        name: req.body.name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        city: req.body.city,
        state: req.body.state,
        company_type: "factory"
    };
    companiesStore.add(newFactory, function(err) {
        if (err) throw err;

        res.json(newFactory);
    });
});
router.delete('/:id', (req, res, next) => {
    companiesStore.remove(req.params.id, (err) => {
    if (err) throw err; // err if the file removal failed
    res.sendStatus('200')
  });
})

module.exports = router;
