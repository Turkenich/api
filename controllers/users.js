var mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.create = function(req, res) {
    if (!req.body.hasOwnProperty('name')) {
        res.send('server error', 500);
        return;
    }

    var user = new User({ name: req.body.name });
    user.save(function (err, _user) {
        if (err){
            console.error(err.err);
            res.send(err)
        }
        else
            res.send(_user.name + ' has been added to the database successfully');
    });
};

exports.get = function(req, res) {
    User.findById(req.params.id)
        .populate('pet')
        .exec(function (err, user) {
            res.send(user);
        });
};

exports.update = function(req, res) {
    User.findById(req.params.id, function (err, user) {
        //TODO
        return user.save(function (err) {
            console.log(!err ? 'updated' : err);
        });
    });
};

exports.delete = function(req, res){
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