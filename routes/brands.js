var express = require('express');
var companiesStore = require('json-fs-store')('store/companies');
var router = express.Router();

/* GET a list of brands */
router.get('/', function(req, res, next) {
    companiesStore.list(function(err, brands) {
        if (err) throw err;
        var brandsList = []
        brands.forEach(function(brand) {
          if (brand.company_type === "brand") {
            brandsList.push(brand)
          }
        })
        res.json(brandsList)
    });
});
router.get('/:id', function(req, res, next) {
    companiesStore.load(req.params.id, function(err, brand) {
        if (err) throw err;

        res.json(brand);
    });
});
router.post('/', function(req, res, next) {
    if (!req.body) return res.sendStatus(400);

    var newBrand = {
        name: req.body.name, 
        email: req.body.email,
        phone_number: req.body.phone_number,
        city: req.body.city,
        state: req.body.state
    };
    companiesStore.add(newBrand, function(err) {
        if (err) throw err;

        res.json(newBrand);
    });
});

module.exports = router;
