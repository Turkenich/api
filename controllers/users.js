var mongoose = require('mongoose'),
    Utils = require('../config/utils'),
    User = mongoose.model('User');

exports.create = function (req, res) {
    var user_data = req.cookies;
    if (req.body.fb_id) req.body.fb_id = user_data.fb_id;
    if (req.body.fb_at) req.body.fb_at = user_data.fb_at;
    var errs = Utils.validateReq(req, ['name', 'image', 'fb_id']);
    if (errs) {
        res.send({err: errs});
        return;
    }

    User.find({fb_id: req.body.fb_id})
        .exec(function (err, users) {
            if (users.length > 0) {
                //user already exists
                console.log(users[0]);
                res.send(users[0]);
                return;
            }
            var user = new User(req.body);
            user.save(function (err, _user) {
                if (err) {
                    console.error(err.err);
                    res.send(err)
                }
                else {
                    console.log(_user);
                    res.send(_user);
                }
            });
        });
};

exports.get = function (req, res) {
    User.findById(req.params.id || req.cookies.user_id)
        .populate('pet')
        .exec(function (err, user) {
            res.send(user);
        });
};

exports.list = function (req, res) {
    User.find(req.query)
        .populate('pet')
        .exec(function (err, users) {
            res.send(users);
        });
};

exports.update = function(req, res) {
    User.findById(req.params.id, function (err, user) {
        user = Utils.assignBodyParams(user, req.body);
        return user.save(function (err) {
            res.send(user);
            console.log(err || user);
        });
    });
};

exports.delete = function (req, res) {
    return User.findById(req.params.id, function (err, user) {
        return user.remove(function (err) {
            if (!err) {
                var message = user.name + ' [' + req.params.id + '] has been deleted successfully';
                console.log(message);
                res.send(message);
            } else {
                console.log(err);
                res.send(err.message, 500);
            }
        });
    });
}