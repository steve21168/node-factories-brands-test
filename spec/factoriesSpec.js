'use strict';


var request = require('supertest');


describe('Factories', function () {
    var app;

    beforeEach(function () {
        app = require('../app.js');
    });
    afterEach(function () {
        app.close();
    });
    it('gets all factories', function (done) {
        request(app)
            .get('/factories')
            .expect(200)
            .end(function(err, res) {
                if (err) return done.fail(res);
                expect(res.body.length).toBeGreaterThan(0);
                done(res);
            });
    });
    it('gets a single factory', function (done) {
        request(app)
            .get('/factories/0a75d3f4-c8ff-47bb-84c3-a874007d1b4f')
            .expect(200)
            .end(function(err, res) {
                if (err) return done.fail(res);
                expect(res.body).not.toBeNull();
                done(res);
            });
    });
    it('creates a new factory', function (done) {
        request(app)
            .post('/factories')
            .send({
              "name": "Test Factory",
              "email": "test@gmail.com",
              "phone_number": "585-343-2345",
              "city": "New York",
              "state": "NY"
            })
            .end(function (err, res) {
                if (err) return done.fail(res);
                expect(res.body.name).toEqual('Test Factory');
                expect(res.body.email).toEqual('test@gmail.com');
                expect(res.body.phone_number).toEqual('585-343-2345');
                expect(res.body.city).toEqual('New York');
                expect(res.body.state).toEqual('NY');
                let factId = res.body.id
                //delete factory
                request(app)
                .delete(`/factories/${factId}`)
                .end((err, res) => {
                  if (err) return done.fail(res);
                  done(res)
                })
            });
    })

    it('Deletes a factory', function (done) {
      // Create a new factory to delete
      request(app)
      .post('/factories')
      .send({
        "name": "Test Factory",
        "email": "test@gmail.com",
        "phone_number": "585-343-2345",
        "city": "New York",
        "state": "NY"
      })
      .end(function (err, res) {
        if (err) return done.fail(res);
        let factId = res.body.id
        //delete factory
        request(app)
        .delete(`/factories/${factId}`)
        .end((err, res) => {
          if (err) return done.fail(res);
          expect(res.statusCode).toEqual(200)
          done(res)
        })
      })
    })

});
