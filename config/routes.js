//module dependencies
var cors = require('cors'),
    pets = require('../controllers/pets'),
    users = require('../controllers/users'),
    media = require('../controllers/media'),
    treats = require('../controllers/treats'),
    donations = require('../controllers/donations'),
    kennels = require('../controllers/kennels');

module.exports = function(app) {
    //cors pre-flight
    app.options('*', cors());

    // pets
    app.get('/', pets.list);
    app.get('/pets', pets.list);
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
        app.post('/', kennels.create);
        app.put('/:id', kennels.update);
        app.del('/:id', kennels.delete);
    });

    //treats
    app.namespace('/treat', function() {
        app.get('/', treats.list);
        app.post('/', treats.create);
        app.put('/:id', treats.update);
        app.del('/:id', treats.delete);
    });

    //donations
    app.namespace('/donation', function() {
        app.get('/', donations.list);
        app.get('/given', donations.given);
        app.get('/pending', donations.pending);
        app.post('/', donations.create);
        app.post('/approve', donations.approve);
        app.put('/:id', donations.update);
        app.del('/:id', donations.delete);
    });
};
