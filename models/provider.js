//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;


//schema
var schema = new Schema({
    name: { type: String, required: false },
});
schema.plugin(timestamps);

mongoose.model('Provider', schema);