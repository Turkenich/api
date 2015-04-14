//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;


//schema
var schema = new Schema({
    workMinutePrice: { type: Number, required: false },
    USDtoILS: { type: Number, required: false },
    GBPtoILS: { type: Number, required: false },
    EURtoILS: { type: Number, required: false },
    silverPrice: { type: Number, required: false },
    brassPrice: { type: Number, required: false },
});
schema.plugin(timestamps);

mongoose.model('Settings', schema);