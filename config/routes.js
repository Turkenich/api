//module dependencies
var cors = require('cors'),
    services = require('../controllers/services'),
    element = require('../controllers/element'),
    coating = require('../controllers/coating'),
    elementFeatures = require('../controllers/elementFeatures'),
    elementType = require('../controllers/elementType'),
    model = require('../controllers/model'),
    order = require('../controllers/order'),
    provider = require('../controllers/provider'),
    settings = require('../controllers/settings'),
    prices = require('../controllers/prices'),
    material = require('../controllers/material');


module.exports = function(app) {
    //cors pre-flight
    app.options('*', cors());

    // services
    app.get('/', services.ping);
    app.get('/ping', services.ping);


    // pets
    app.namespace('/orders', function() {
        app.get('/', order.list);
        app.post('/', order.create);
        app.get('/:id', order.get);
        app.put('/:id', order.update);
        app.del('/:id', order.delete);
    });

    app.namespace('/models', function() {
        app.get('/', model.list);
        app.post('/', model.create);
        app.get('/maxId', model.maxId);
        app.get('/:id', model.get);
        app.put('/:id', model.update);
        app.del('/:id', model.delete);
    });

    app.namespace('/elements', function() {
        app.get('/', element.list);
        app.post('/', element.create);
        app.get('/:id', element.get);
        app.put('/:id', element.update);
        app.del('/:id', element.delete);
    });

    app.namespace('/elementTypes', function() {
        app.get('/', elementType.list);
        app.post('/', elementType.create);
        app.get('/:id', elementType.get);
        app.put('/:id', elementType.update);
        app.del('/:id', elementType.delete);
    });

    app.namespace('/materials', function() {
        app.get('/', material.list);
        app.post('/', material.create);
        app.get('/:id', material.get);
        app.put('/:id', material.update);
        app.del('/:id', material.delete);
    });

    app.namespace('/providers', function() {
        app.get('/', provider.list);
        app.post('/', provider.create);
        app.get('/:id', provider.get);
        app.put('/:id', provider.update);
        app.del('/:id', provider.delete);
    });

    app.namespace('/coatings', function() {
        app.get('/', coating.list);
        app.post('/', coating.create);
        app.get('/:id', coating.get);
        app.put('/:id', coating.update);
        app.del('/:id', coating.delete);
    });

    app.namespace('/elementFeatures', function() {
        app.get('/', elementFeatures.list);
        app.post('/', elementFeatures.create);
        app.get('/:id', elementFeatures.get);
        app.put('/:id', elementFeatures.update);
        app.del('/:id', elementFeatures.delete);
    });

    app.namespace('/settings', function() {
        app.get('/', settings.list);
        app.post('/', settings.create);
        app.get('/:id', settings.get);
        app.put('/:id', settings.update);
        app.del('/:id', settings.delete);
    });

    app.namespace('/prices', function() {
        app.get('/', prices.list);
        app.post('/', prices.create);
        app.get('/:id', prices.get);
        app.put('/:id', prices.update);
        app.del('/:id', prices.delete);
    });
};
