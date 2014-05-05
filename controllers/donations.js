var mongoose = require('mongoose'),
    Donation = mongoose.model('Donation'),
    Media = mongoose.model('Media'),
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

    if (req.query.force == '1') {
        if (!req.body.treat) req.body.treat = null;
        if (!req.body.user) req.body.user = null;
        if (!req.body.pet) req.body.pet = null;
    } else {
        if (!req.body.treat) res.send({err: 'missing treat id'});
        if (!req.body.user) res.send({err: 'missing user id'});
        if (!req.body.pet) res.send({err: 'missing pet id'});
    }
//    if (!req.body.media) res.send({err: 'missing media id'}); - media id is not required

    if (req.body.media) {
    }

    var donation = new Donation(req.body);
    donation.save(function (err, donation) {
        if (err) {
            console.error(err.name);
            res.send(err)
        } else {
            if (req.body.media) {
                Media.findById(req.body.media, function (err, media) {
                    if (!err) {
                        media.donation = donation._id;
                        media.pet = req.body.pet;
                        media.save();
                    }
                });
                Pet.findById(req.body.pet, function (err, pet) {
                    if (!err) {
                        pet.donations.push(donation._id);
                        pet.save();
                    }
                });
                User.findById(req.body.user, function (err, user) {
                    if (!err) {
                        user.donations.push(donation._id);
                        user.save();
                    }
                });
            }
            res
                .populate('pet')
                .populate('user')
                .populate('treat')
                .populate('media')
                .send(donation);
        }
    });
};

exports.get = function (req, res) {
    Donation.findById(req.params.id)
        .exec(function (err, donation) {
            res
                .populate('pet')
                .populate('user')
                .populate('treat')
                .populate('media')
                .send(donation);
        });
};

exports.update = function (req, res) {
    Donation.findById(req.params.id, function (err, donation) {
        for (var k in req.body) {
            if (req.body[k]) {
                if (req.body[k]['_id']){
                    donation[k] = req.body[k]._id;
                }else{
                    donation[k] = req.body[k];
                }
            }
        }
        return donation.save(function (err) {
            res
                .populate('pet')
                .populate('user')
                .populate('treat')
                .populate('media')
                .send(donation);
            console.log(err || donation);
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