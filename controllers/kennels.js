var mongoose = require('mongoose'),
    Kennel = mongoose.model('Kennel');

exports.list = function(req, res) {
    Kennel.find({})
        .exec(function (err, Kennels) {
            res.send(Kennels);
        });
};

exports.create = function(req, res) {
    var Kennel = new Kennel(req.body);
    Kennel.save(function (err, _Kennel) {
        if (err){
            console.error(err.err);
            res.send(err)
        }
        else
            res.send(_Kennel.name + ' has been added to the database successfully');
    });
};

exports.get = function(req, res) {
    Kennel.findById(req.params.id)
        .exec(function (err, Kennel) {
            res.send(Kennel);
        });
};

exports.update = function(req, res) {
    Kennel.findById(req.params.id, function (err, Kennel) {
        for (var k in Kennel){
            if (req.body[k])
                Kennel[k] = req.body[k];
        }
        return Kennel.save(function (err) {
            var msg = !err ? ('Kennel updated successfully \"' + Kennel.name + '\"') : err;
            res.send(msg);
            console.log(msg);
        });
    });
};

exports.delete = function(req, res){
    return Kennel.findById(req.params.id, function (err, Kennel) {
        return Kennel.remove(function (err) {
            if (!err) {
                var message = Kennel.name + ' [' + req.params.id + '] has been deleted successfully';
                console.log(message);
                res.send(message);
            } else {
                console.log(err);
                res.send(err.message, 500);
            }
        });
    });
}