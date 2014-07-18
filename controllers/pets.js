var mongoose = require('mongoose'),
    Utils = require('../config/utils'),
    Pet = mongoose.model('Pet'),
    Donation = mongoose.model('Donation'),
    Media = mongoose.model('Media');

exports.list = function (req, res) {
    Pet.find({})
        .populate('user')
        .populate('kennel')
        .populate('media')
        .exec(function (err, pets) {
            res.send(pets);
        });
};

exports.lonely = function (req, res) {
    Pet.find({user: null})
        .populate('kennel')
        .populate('media')
        .exec(function (err, pets) {
            res.send(pets);
        });
};

exports.owned = function (req, res) {
    Pet.find({user: {$not: null}})
        .populate('user')
        .populate('kennel')
        .populate('media')
        .exec(function (err, pets) {
            res.send(pets);
        });
};

exports.create = function (req, res) {
    var errs = Utils.validateReq(req, ['name']);
    if (errs) res.send({err: errs});

    var pet = new Pet(req.body);
    pet.save(function (err, _pet) {
        if (err) {
            console.error(err.err);
            res.send(err)
        }
        else
        //update corresponding media item
        if (req.body.media) {
            Media.findById(req.body.media)
                .exec(function (err, media) {
                    media.pet = _pet._id;
                    media.save();
                });

        }
        res.send(_pet);
    });
};

exports.get = function (req, res) {
    Pet.findById(req.params.id)
        .populate('kennel')
        .populate('media')
        .exec(function (err, pet) {
            res.send(pet);
        });
};

exports.update = function (req, res) {
    Pet.findById(req.params.id, function (err, pet) {
        pet = Utils.assignBodyParams(pet, req.body);
        return pet.save(function (err, _pet) {
            res.send(_pet);
            console.log(err || _pet);
        });
    });
};

exports.delete = function (req, res) {
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