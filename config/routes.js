module.exports = function(app, models) {
    var Pet = models.Pet;
    var Video = models.Video;

    ///////////////
    //    PETS   //
    ///////////////

    // LIST PETS //
    app.get('/', function(req, res) {
        Pet.find({})
            .populate('videos', 'url')
            .exec(function (err, pets) {
                res.send(pets);
            });
    });

    // SINGLE PET //
    app.namespace('/pet', function() {
        // ADD //
        app.post('/', function(req, res) {
            if (!req.body.hasOwnProperty('name')) {
                res.send('missing name', 500);
                return;
            }

            var pet = new Pet({ name: req.body.name });
            pet.save(function (err, _pet) {
                if (err){
                    console.error(err.err);
                    res.send(err)
                }
                else
                    res.send(_pet.name + ' has been added to the database successfully');
            });
        });

        // GET //
        app.get('/:id', function(req, res) {
            Pet.findById(req.params.id)
                .populate('videos', 'url')
                .exec(function (err, pet) {
                    res.send(pet);
                });
        });

        // UPDATE //
        app.put('/:id', function(req, res) {
            Pet.findById(req.params.id, function (err, pet) {
                pet.name = req.body.name;
                return pet.save(function (err) {
                    console.log(!err ? 'updated' : err);
                });
            });
        });

        // DEL //
        app.del('/:id', function(req, res){
            return Pet.findById(req.params.id, function (err, pet) {
                return pet.remove(function (err) {
                    if (!err) {
                        var message = pet.name + ' [' + req.params.id + '] has been deleted successfully';
                        console.log(message);
                        res.send(message);
                    } else {
                        console.log(err);
                        res.send(err.message, 500);
                    }
                });
            });
        });
    });

    ///////////////
    //   VIDEOS  //
    ///////////////
    app.namespace('/video', function() {
        // ADD //
        app.post('/', function(req, res) {
            if (!req.body.hasOwnProperty('pet') || !req.body.hasOwnProperty('url')) {
                res.send('missing param', 500);
                return;
            }

            Pet.findById(req.body.pet, function (err, pet) {
                var video = new Video({ url: req.body.url });
                video.save(function (err, _video) {
                    if (err){
                        console.error(err.err);
                        res.send(err)
                    }
                    else {
                        pet.videos.push(video.id);
                        res.send(_video.url + ' has been added to ' + pet.name + '\'s videos');
                    }
                });
                pet.videos.push(video.id);
                pet.save();
            });
        });

        // DEL //
        app.del('/:id', function(req, res){
            return Video.findById(req.params.id, function (err, video) {
                return video.remove(function (err) {
                    if (!err) {
                        var message = video.id + ' has been deleted successfully';
                        console.log(message);
                        res.send(message);
                    } else {
                        console.log(err);
                        res.send(err.message, 500);
                    }
                });
            });
        });
    });
};
