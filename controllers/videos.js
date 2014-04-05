var mongoose = require('mongoose'),
    Pet = mongoose.model('Pet'),
    Video = mongoose.model('Video');

exports.create = function(req, res) {
    if (!req.body.hasOwnProperty('pet') || !req.body.hasOwnProperty('url')) {
        res.send('missing param', 500);
        return;
    }

    Pet.findById(req.body.pet, function (err, pet) {
        var video = new Video({ url: req.body.url });
        video.save(function (err, _video) {
            if (err){
                console.error(err.err);
                res.send(err)
            }
            else {
                pet.videos.push(video.id);
                res.send(_video.url + ' has been added to ' + pet.name + '\'s videos');
            }
        });
        pet.videos.push(video.id);
        pet.save();
    });
};

exports.delete = function(req, res) {
    return Video.findById(req.params.id, function (err, video) {
        return video.remove(function (err) {
            if (!err) {
                var message = video.id + ' has been deleted successfully';
                console.log(message);
                res.send(message) ;
            } else {
                console.log(err);
                res.send(err.message, 500);
            }
        });
    });
};