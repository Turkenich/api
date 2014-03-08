var mongoose = require('mongoose'),
    Pet = mongoose.model('Pet');

exports.list = function(req, res) {
    Pet.find({})
        .populate('videos', 'url')
        .exec(function (err, pets) {
            res.send(pets);
        });
};

exports.create = function(req, res) {
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
};

exports.get = function(req, res) {
    Pet.findById(req.params.id)
        .populate('videos', 'url')
        .exec(function (err, pet) {
            res.send(pet);
        });
};

exports.update = function(req, res) {
    Pet.findById(req.params.id, function (err, pet) {
        pet.name = req.body.name;
        return pet.save(function (err) {
            console.log(!err ? 'updated' : err);
        });
    });
};

exports.delete = function(req, res){
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
}