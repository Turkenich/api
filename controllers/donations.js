var mongoose = require('mongoose'),
    Utils = require('../config/utils'),
    Donation = mongoose.model('Donation'),
    Media = mongoose.model('Media'),
    User = mongoose.model('User'),
    Pet = mongoose.model('Pet');

exports.list = function (req, res) {
    var q = req.query;
    if (req.query.pet_id) q['pet'] = req.query.pet_id;

    Donation.find(q)
        .populate('pet')
        .populate('user')
        .populate('treat')
        .populate('media')
        .exec(function (err, Donations) {
            res.send(Donations);
        });
};

exports.approve = function (req, res) {
    console.log('Approval request arrived');
    var q = {};
    if (!req.body.item_number) return;
    q['paypalItem'] = req.body.item_number;
    console.log('item_number arrived');
    console.log(req.body.item_number);

    Donation.find(q)
        .exec(function (err, donations) {
            console.log('donation found ');
            console.log(donations);

            var newAdoption = false;
            for (var donation, d = 0; donation = donations[d]; d++) {
                donation.payed = true;
                donation.save();

                var pet_id = donation.pet;
                var user_id = donation.user;

                User.find({_id: user_id}, function (err, users) {
                    if (err || !users || users.length < 1) return;
                    var user = users[0];
                    if (user.pet != pet_id) {
                        user.pet = pet_id;
                        newAdoption = true;
                    }
                    user.save();
                    Pet.find({_id: pet_id}, function (err, pets) {
                        if (err || !pets || pets.length < 1) return;
                        var pet = pets[0];
                        if (pet.user != user_id) {
                            pet.user = user_id;
                            newAdoption = true;
                        }
                        pet.save();
                        res.send({approved: true, newAdoption: newAdoption});
                    });
                });
            }
        });
};

exports.create = function (req, res) {

    var errs = Utils.validateReq(req, ['treat', 'user', 'pet']);
    if (errs) res.send({err: errs});

    var donation = new Donation(req.body);
    donation.save(function (err, _donation) {
        if (err) {
            console.error(err.name);
            res.send(err)
        } else {
            //update media
            if (req.body.media) {
                Media.findById(req.body.media, function (err, media) {
                    if (!err) {
                        media.donation = _donation._id;
                        media.save();
                    }
                });
            }

            res.send(_donation);
        }
    });
};

exports.get = function (req, res) {
    Donation.findById(req.params.id)
        .exec(function (err, donation) {
            if (err) res.send({err: err})
            else {
                res.send(donation);
            }
        });
};

exports.update = function (req, res) {
    Donation.findById(req.params.id, function (err, donation) {
        donation = Utils.assignBodyParams(donation, req.body);
        return donation.save(function (err, _donation) {
            if (err) res.send({err: err})
            else {
                res.send(_donation);
            }

        });
    });
};

exports.delete = function (req, res) {
    //todo remove from user / media / pet
    return Donation.findById(req.params.id, function (err, donation) {
        if (!donation) return;
        //remove donation from media
        Media.find({donation: donation._id}, function (err, medias) {
            if (err || !medias || medias.length < 1) return;
            var media = medias[0];
            media.donation = null;
            media.save();
        });
        return donation.remove(function (err, _donation) {
            if (!err) {
                var message = _donation.name + ' [' + req.params.id + '] has been deleted successfully';
                console.log(message);
                res.send(message);
            } else {
                console.log(err);
                res.send(err.message, 500);
            }
        });
    });
}

exports.pending = function (req, res) {
    var q = {pet: req.query.pet_id, payed: true, media: null};

    Donation.find(q)
        .populate('pet')
        .populate('user')
        .populate('treat')
        .populate('media')
        .exec(function (err, Donations) {
            res.send(Donations);
        });
}

exports.given = function (req, res) {
    var q = {pet: req.query.pet_id, payed: true, media: {$ne: null}};

    Donation.find(q)
        .populate('pet')
        .populate('user')
        .populate('treat')
        .populate('media')
        .exec(function (err, Donations) {
            res.send(Donations);
        });
}