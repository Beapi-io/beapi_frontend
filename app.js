//var express = require('express');


/*
require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }

    var $ = require("jquery")(window);
});
*/

//global.jQuery = require('jquery');
//var $ = global.jQuery;


var express = require('express'), http = require('http');

var app = express();
var server = http.createServer(app);
var router = express.Router();
var path2 = __dirname + '/public/html/';

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var routes = require('./routes/index');
//var users = require('./routes/users');

// a bunch of your middleware...

app.use(setupDomains);
var domain = require('domain');

function setupDomains(req, res, next) {
  var reqd = domain.create();
  domain.active = reqd;
  reqd.add(req);
  reqd.add(res);
  reqd.on('error', function(err) {
    req.next(err);
  });
  res.on('end', function() {
    console.log('disposing domain for url ' + req.url);
    reqd.dispose();
  });
  reqd.run(next);
}


/*
app.get('/:page', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'html', path.basename(req.params.page) + '.html'));
});
*/


router.use(function (req,res,next) {
  console.log("/" + req.method);
  console.log(req.route);
  next();
});

router.get("/:page",function(req,res){
  res.sendFile(__dirname + "/public/html/" + path.basename(req.params.page));
});


/*
router.get("/services",function(req,res){
  console.log("/" + req.method);
  res.sendFile(path2 + "page_services.html");
});
*/


app.use("/",express.static(__dirname + '/public/html', { maxAge: 1 }));
app.use("/css",express.static(path2 + "/assets/css"));
app.use("/js",express.static(path2 + "/assets/js"));
app.use("/plugins",express.static(path2 + "/assets/plugins"));
app.use("/images",express.static(__dirname + "/public/images"));


app.use("/",router);


// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(require('stylus').middleware(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  //console.log(JSON.stringify(req.headers));
  var err = new Error('Not Found');
  console.log(req.route);
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
/*
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
*/



module.exports = app;

/*
app.get('/', function (req, res) {
  //res.send('Hello World!');
  res.send()
});
*/

app.all("/*", function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST,DELETE,OPTIONS");
  return next();
});

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});
