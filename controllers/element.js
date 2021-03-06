var mongoose = require('mongoose'),
    Utils = require('../config/utils'),
    Model = mongoose.model('Element');


for (var i=0, method; method=Utils.defaultMethods[i]; i++){
    exports.get = function (req, res) { Utils.get(Model, req, res); }
    exports.list = function (req, res) { Utils.list(Model, req, res); }
    exports.create = function (req, res) { Utils.create(Model, req, res); }
    exports.update = function (req, res) { Utils.update(Model, req, res); }
    exports.delete = function (req, res) { Utils.delete(Model, req, res); }
}

exports.populated = function(req, res) {
    Model.findById(req.params.id)
        .populate('elementType')
        .populate('material')
        .populate('coating')
        .populate('elementFeatures')
        .populate('provider')
        .populate('workUnitCurrency')
        .exec(function (err, model) {
            res.send(model);
        });
};
