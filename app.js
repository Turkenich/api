// module dependencies //
var express = require('express'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose'),
    models = require('./config/models')(mongoose);
require('express-namespace');

// app init & config //
var app = module.exports = express();
var config = require('./config/config.js');
app.configure(function() {
    // all environments
    app.set('port', config.app_port);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(require('connect-multiparty')());
    app.use(express.methodOverride());
    app.use(express.cookieParser('tFl#8^*971'));
    app.use(express.session());
    app.use(app.router);

    //specific environments
    switch (app.get('env')) {
        case 'production':
            app.use(express.errorHandler());
            break;
        case 'staging':
            break;
        default:
            app.use(express.errorHandler({
                dumpExceptions: true,
                showStack: true
            }));
    }
});

// routes //
require('./config/routes.js')(app, models);

// db connection //
mongoose.connect(config.mongodb_uri);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () { console.log('db connected successfully'); });

// web connection //
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
