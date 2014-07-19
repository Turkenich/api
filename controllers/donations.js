var mongoose = require('mongoose'),
    Utils = require('../config/utils'),
    Donation = mongoose.model('Donation'),
    Media = mongoose.model('Media'),
    User = mongoose.model('User'),
    Pet = mongoose.model('Pet');

exports.list = function (req, res) {
    var q = {};
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
    console.log(req);
    var q = {};
    if (!req.body.item_number) return;
    q['paypalItem'] = req.body.item_number;
    console.log('item_number arrived');
    console.log(req.body.item_number);

    Donation.find(q)
        .exec(function (err, donations) {
            console.log('donation found ');
            console.log(donations);
            for (var d = 0, donation; donation = donations[d]; d++) {
                donation.payed = true;
                donation.save();
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
    return Donation.findById(req.params.id, function (err, Donation) {
        return Donation.remove(function (err) {
            if (!err) {
                var message = Donation.name + ' [' + req.params.id + '] has been deleted successfully';
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
    var q = {pet: req.query.pet_id, given: false};

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
    var q = {pet: req.query.pet_id, given: true};

    Donation.find(q)
        .populate('pet')
        .populate('user')
        .populate('treat')
        .populate('media')
        .exec(function (err, Donations) {
            res.send(Donations);
        });
}