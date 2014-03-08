module.exports = function(app, models) {
    var Pets = models.Pets;

    ///////////////
    // LIST PETS //
    app.get('/', function(req, res) {
        Pets.find({}, function (err, pets) {
            res.send(pets);
        });
    });


    ////////////////
    // SINGLE PET //
    app.namespace('/pet', function() {
        // ADD //
        app.post('/', function(req, res) {
            if (!req.body.hasOwnProperty('name')) {
                res.send('missing name', 500);
                return;
            }

            var pet = new Pets({ name: req.body.name });
            pet.save(function (err, dog) {
                if (err){
                    if (err.code === 11000)
                        res.send('Sorry a dog named ' + req.body.name + ' already exists in our database');
                    else {
                        console.error(err.err);
                        res.send(err);
                    }
                }
                else
                    res.send(dog.name + ' has been added to the database successfully');
            });
        });

        // GET //
        app.get('/:id', function(req, res) {
            Pets.findById(req.params.id, function (err, pet) {
                res.send(pet);
            });
        });

        // UPDATE //
        app.put('/:id', function(req, res) {
            Pets.findById(req.params.id, function (err, pet) {
                pet.name= req.body.name;
                return pet.save(function (err) {
                    if (!err) {
                        console.log("updated");
                    } else {
                        console.log(err);
                    }
                    return res.send(pet);
                });
            });
        });

        // DEL //
        app.del('/:id', function(req, res){
            return Pets.findById(req.params.id, function (err, pet) {
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
};
