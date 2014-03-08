//module dependencies
var pets = require('../controllers/pets'),
    videos = require('../controllers/videos');

module.exports = function(app) {
    // pets
    app.get('/', pets.list);
    app.namespace('/pet', function() {
        app.post('/', pets.create);
        app.get('/:id', pets.get);
        app.put('/:id', pets.update);
        app.del('/:id', pets.delete);
    });

    //videos
    app.namespace('/video', function() {
        app.post('/', videos.create);
        app.del('/:id', videos.delete);
    });
};
