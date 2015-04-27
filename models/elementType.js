//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;


//schema
var schema = new Schema({
    name: { type: String, required: true },
    measureUnit: { type: String, enum: ['gram', 'centimeter', 'unit'], default:'unit', required: false },
});
schema.plugin(timestamps);

mongoose.model('ElementType', schema);