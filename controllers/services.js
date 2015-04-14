var mongoose = require('mongoose'),
    Utils = require('../config/utils');

var gcm = require('node-gcm');
var apn = require('apn');


exports.ping = function (req, res) {
    res.send('connected');
}