//module dependencies
var cors = require('cors'),
    services = require('../controllers/services'),
    element = require('../controllers/element'),
    coating = require('../controllers/coating'),
    elementFeatures = require('../controllers/elementFeatures'),
    elementType = require('../controllers/elementType'),
    jewellery = require('../controllers/jewellery'),
    order = require('../controllers/order'),
    provider = require('../controllers/provider'),
    settings = require('../controllers/settings'),
    material = require('../controllers/material');


module.exports = function(app) {
    //cors pre-flight
    app.options('*', cors());

    // services
    app.get('/ping', services.ping);


    // pets
    app.get('/', provider.list);
    app.get('/testadd', provider.testadd);
/*
    app.namespace('/pet', function() {
        app.get('/', pets.list);
        app.get('/lonely', pets.lonely);
        app.get('/adopted', pets.adopted);
        app.post('/', pets.create);
        app.get('/:id', pets.get);
        app.put('/:id', pets.update);
        app.del('/:id', pets.delete);
    });


    //users
    app.namespace('/user', function() {
        app.get('/', users.list);
        app.get('/:id', users.get);
        app.post('/', users.create);
        app.put('/:id', users.update);
        app.del('/:id', users.delete);
    });

    //media
    app.namespace('/media', function() {
        app.get('/', media.list);
        app.get('/last', media.last);
        app.get('/:id', media.get);
        app.post('/', media.create);
        app.put('/:id', media.update);
        app.del('/:id', media.delete);
    });

    //kennels
    app.namespace('/kennel', function() {
        app.get('/', kennels.list);
        app.get('/:id', kennels.get);
        app.post('/', kennels.create);
        app.put('/:id', kennels.update);
        app.del('/:id', kennels.delete);
    });

    //treats
    app.namespace('/treat', function() {
        app.get('/', treats.list);
        app.get('/:id', treats.get);
        app.post('/', treats.create);
        app.put('/:id', treats.update);
        app.del('/:id', treats.delete);
    });

    //donations
    app.namespace('/donation', function() {
        app.get('/', donations.list);
        app.get('/given', donations.given);
        app.get('/pending', donations.pending);
        app.get('/:id', donations.get);
        app.post('/', donations.create);
        app.post('/approve', donations.approve);
        app.put('/:id', donations.update);
        app.del('/:id', donations.delete);
    });
*/
};
