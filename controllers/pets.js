var mongoose = require('mongoose'),
    Utils = require('../config/utils'),
    Pet = mongoose.model('Pet'),
    Donation = mongoose.model('Donation'),
    Media = mongoose.model('Media');

exports.list = function(req, res) {
    Pet.find({})
        .exec(function (err, pets) {
            res.send(pets);
        });
};

exports.create = function(req, res) {
    var errs = Utils.validateReq(req, ['name']);
    if (errs) res.send({err: errs});

    var pet = new Pet(req.body);
    pet.save(function (err, _pet) {
        if (err){
            console.error(err.err);
            res.send(err)
        }
        else
            if (req.body.media){
                Media.findById(req.body.media)
                    .exec(function (err, media) {
                        media.pet = _pet._id;
                        media.save();
                    });

            }
            res.send(_pet);
    });
};

exports.get = function(req, res) {
    Pet.findById(req.params.id)
        .populate('donations')
        .exec(function (err, pet) {
            Donation.find({'pet':pet.id})
                .populate('user')
                .populate('treat')
                .populate('media')
                .exec(function(err, donations){
                    pet.donations = donations;
                    res.send(pet);
                });
        });
};

exports.update = function(req, res) {
    Pet.findById(req.params.id, function (err, pet) {
        for (var i in req.body){
            pet[i] = req.body[i];
        }
        return pet.save(function (err) {
            res.send(pet);
            console.log(err || pet);
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