var mongoose = require('mongoose'),
    Utils = require('../config/utils'),
    Donation = mongoose.model('Donation'),
    Media = mongoose.model('Media'),
    User = mongoose.model('User'),
    Pet = mongoose.model('Pet');

exports.list = function (req, res) {
    Donation.find({})
        .populate('pet')
        .populate('user')
        .populate('treat')
        .populate('media')
        .exec(function (err, Donations) {
            res.send(Donations);
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
                res
                    .populate('pet')
                    .populate('user')
                    .populate('treat')
                    .populate('media')
                    .send(donation);
            }
        });
};

exports.update = function (req, res) {
    Donation.findById(req.params.id, function (err, donation) {
        for (var k in req.body) {
            if (req.body[k]) {
                if (req.body[k]['_id']) {
                    donation[k] = req.body[k]._id;
                } else {
                    donation[k] = req.body[k];
                }
            }
        }
        return donation.save(function (err) {

            if (err) res.send({err: err})
            else {
                res.send(donation);
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