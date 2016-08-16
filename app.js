var express = require('express');
var path = require('path');

var logger = require('morgan');
var bodyParser = require('body-parser');

var factoryRoutes = require('./routes/factories');
var brandRoutes = require('./routes/brands');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/factories', factoryRoutes);
app.use('/brands', brandRoutes);

app.get('/', function(req, res) {
    res.send('Status 200');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: {}
    });
});

// start the web server
var server = app.listen(3000, function () {
    var port = server.address().port;
    console.log('Server listening at port %s', port);
});

module.exports = server;
