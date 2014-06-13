var mongoose = require('mongoose'),
    Pet = mongoose.model('Pet'),
    Media = mongoose.model('Media');

exports.list = function (req, res) {
    Media.find({})
        .populate('pet')
        .populate('donation')
        .exec(function (err, pets) {
            res.send(pets);
        });
    ;
};

exports.last = function (req, res) {
    Media.find({})
        .limit(1)
        .sort('-_id')
        .populate('pet')
        .populate('donation')
        .exec(function (err, pets) {
            if (!err) res.send(pets[0]);
        });
    ;
};

exports.create = function (req, res) {
    /*
     if (!req.body.hasOwnProperty('pet') || !req.body.hasOwnProperty('type') || !req.body.hasOwnProperty('url')) {
     res.send('missing param', 500);
     return;
     }
     */
    Media.find({ext_id: req.body.ext_id }, function (err, _media) {
        if (_media.length == 0) {
            var media = new Media(req.body);
            media.save(function (err) {
                if (err) {
                    console.error(err.err);
                    res.send(err)
                } else {
                    res
                        .populate('pet')
                        .populate('donation')
                        .send(media);
                }
            });
        }
    });
};

exports.update = function (req, res) {
    if (req.body.hasOwnProperty('_id')) {
        Media.findById(req.body._id, function (err, media) {
            for (var m in req.body) {
                media[m] = req.body[m];
            }
            media.save(function (err, _media) {
                if (err) {
                    console.error(err.err);
                    res.send(err)
                } else {
                    res.send(_media);
                }
            });
        });
    }
};

exports.delete = function (req, res) {
    return Media.findById(req.params.id, function (err, media) {
        return media.remove(function (err) {
            if (!err) {
                var message = media.id + ' has been deleted successfully';
                console.log(message);
                res.send(message);
            } else {
                console.log(err);
                res.send(err.message, 500);
            }
        });
    });
};