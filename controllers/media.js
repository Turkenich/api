var mongoose = require('mongoose'),
    Pet = mongoose.model('Pet'),
    Media = mongoose.model('Media');

exports.list = function(req, res) {
    Media.find({})
        .exec(function (err, pets) {
            res.header('Access-Control-Allow-Origin', "*");
            res.send(pets);
        });
    ;
};

exports.create = function(req, res) {
    if (!req.body.hasOwnProperty('pet') || !req.body.hasOwnProperty('type') || !req.body.hasOwnProperty('url')) {
        res.send('missing param', 500);
        return;
    }

    Pet.findById(req.body.pet, function (err, pet) {
        var media = new Media({ type: req.body.type, url: req.body.url });
        media.save(function (err, _media) {
            if (err){
                console.error(err.err);
                res.send(err)
            }
            else {
                pet.media.push(_media.id);
                pet.save();
                res.send(_media.url + ' [' + _media.type + '] has been added to ' + pet.name + '\'s media');
            }
        });
    });
};

exports.delete = function(req, res) {
    return Media.findById(req.params.id, function (err, media) {
        return media.remove(function (err) {
            if (!err) {
                var message = media.id + ' has been deleted successfully';
                console.log(message);
                res.send(message) ;
            } else {
                console.log(err);
                res.send(err.message, 500);
            }
        });
    });
};