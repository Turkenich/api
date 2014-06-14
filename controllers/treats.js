var mongoose = require('mongoose'),
    Utils = require('../config/utils'),
    Treat = mongoose.model('Treat');

exports.list = function(req, res) {
    Treat.find({})
        .exec(function (err, Treats) {
            res.send(Treats);
        });
};

exports.create = function(req, res) {

    var errs = Utils.validateReq(req, ['name', 'price']);
    if (errs) res.send({err: errs});

    var treat = new Treat(req.body);
    treat.save(function (err, _treat) {
        if (err){
            console.error(err.name);
            res.send(err)
        }
        else
            res.send(_treat);
    });
};

exports.get = function(req, res) {
    Treat.findById(req.params.id)
        .exec(function (err, treat) {
            res.send(treat);
        });
};

exports.update = function(req, res) {
    Treat.findById(req.params.id, function (err, treat) {
        for (var k in req.body){
            if (req.body[k])
                treat[k] = req.body[k];
        }
        return treat.save(function (err) {
            res.send(treat);
            console.log(err || treat);
        });
    });
};

exports.delete = function(req, res){
    return Treat.findById(req.params.id, function (err, Treat) {
        return Treat.remove(function (err) {
            if (!err) {
                var message = Treat.name + ' [' + req.params.id + '] has been deleted successfully';
                console.log(message);
                res.send(message);
            } else {
                console.log(err);
                res.send(err.message, 500);
            }
        });
    });
}