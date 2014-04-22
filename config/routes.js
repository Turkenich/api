//module dependencies
var pets = require('../controllers/pets'),
    media = require('../controllers/media');

module.exports = function(app) {
    // pets
    app.get('/', pets.list);
    app.get('/pets', pets.list);
    app.namespace('/pet', function() {
        app.post('/', pets.create);
        app.get('/:id', pets.get);
        app.put('/:id', pets.update);
        app.del('/:id', pets.delete);
    });

    //media
    app.namespace('/media', function() {
        app.get('/', media.list);
        app.post('/', media.create);
        app.put('/:id', media.update);
        app.del('/:id', media.delete);
    });
};
