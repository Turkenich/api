var mongoose = require('mongoose'),
    Utils = require('../config/utils'),
    Model = mongoose.model('Model');


for (var i=0, method; method=Utils.defaultMethods[i]; i++){
    exports.get = function (req, res) { Utils.get(Model, req, res); }
    exports.list = function (req, res) { Utils.list(Model, req, res); }
    exports.create = function (req, res) { Utils.create(Model, req, res); }
    exports.update = function (req, res) { Utils.update(Model, req, res); }
    exports.delete = function (req, res) { Utils.delete(Model, req, res); }
}

exports.maxId = function(req, res){
    Model.findOne({modelType: req.query.modelType})
        .sort('-modelId')  // give me the max
        .exec(function (err, Models) {
            res.send(Models);
        });

}