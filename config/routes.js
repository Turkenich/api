//module dependencies
var pets = require('../controllers/pets'),
    media = require('../controllers/media'),
    treats = require('../controllers/treats'),
    donations = require('../controllers/donations'),
    kennels = require('../controllers/kennels');

module.exports = function(app) {
    // pets
    app.get('/', pets.list);
    app.get('/pets', pets.list);
    app.namespace('/pet', function() {
        app.get('/', pets.list);
        app.post('/', pets.create);
        app.get('/:id', pets.get);
        app.put('/:id', pets.update);
        app.del('/:id', pets.delete);
    });

    //media
    app.namespace('/media', function() {
        app.get('/', media.list);
        app.get('/last', media.last);
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
        app.post('/', donations.create);
        app.put('/:id', donations.update);
        app.del('/:id', donations.delete);
    });
};
