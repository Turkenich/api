//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;


//schema
var schema = new Schema({
    pos: { type: Number, default: Date.now },
    name: { type: String, required: false },
    price: { type: Number, required: false },
    measureUnit: { type: String, enum: ['gram', 'centimeter', 'unit'], default:'unit', required: false },
});
schema.plugin(timestamps);

mongoose.model('ElementFeatures', schema);