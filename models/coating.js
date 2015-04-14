//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;


//schema
var schema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
});
schema.plugin(timestamps);

mongoose.model('Coating', schema);