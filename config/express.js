// module dependencies
var express = require('express')

module.exports = function (app, config) {
    app.set('port', config.app.port);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(require('connect-multiparty')());
    app.use(express.methodOverride());
    app.use(express.cookieParser('d1A76YqsMksz6Mf5mTJI1b530EXjP87d'));
    app.use(express.session({ secret: 'd1A76YqsMksz6Mf5mTJI1b530EXjP87d' }));
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
}