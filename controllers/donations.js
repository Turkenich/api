var mongoose = require('mongoose'),
    Donation = mongoose.model('Donation');

exports.list = function(req, res) {
    Donation.find({})
        .exec(function (err, Donations) {
            res.send(Donations);
        });
};

exports.create = function(req, res) {

    var donation = new Donation(req.body);
    donation.save(function (err, donation) {
        if (err){
            console.error(err.name);
            res.send(err)
        }
        else
            res.send(donation);
    });
};

exports.get = function(req, res) {
    Donation.findById(req.params.id)
        .exec(function (err, donation) {
            res.send(donation);
        });
};

exports.update = function(req, res) {
    Donation.findById(req.params.id, function (err, donation) {
        for (var k in req.body){
            if (req.body[k])
                donation[k] = req.body[k];
        }
        return donation.save(function (err) {
            res.send(donation);
            console.log(err || donation);
        });
    });
};

exports.delete = function(req, res){
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