var express = require('express');
var companiesStore = require('json-fs-store')('store/companies');
var router = express.Router();

/* GET a list of brands */
router.get('/', function(req, res, next) {
    companiesStore.list(function(err, brands) {
        if (err) throw err;
        let brandsList = []
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
        if (err || brand.company_type !== "brand") {
          throw err
        } else {
          res.json(brand);
        }
    });
});
router.post('/', function(req, res, next) {
    if (!req.body) return res.sendStatus(400);

    let newBrand = {
        name: req.body.name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        city: req.body.city,
        state: req.body.state,
        company_type: "brand"
    };
    companiesStore.add(newBrand, function(err) {
        if (err) throw err;

        res.json(newBrand);
    });
});

router.delete('/:id', (req, res, next) => {
    companiesStore.remove(req.params.id, (err) => {
    if (err) throw err; // err if the file removal failed
    res.sendStatus('200')
  });
})

module.exports = router;
