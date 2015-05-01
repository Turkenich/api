//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;


//schema
var schema = new Schema({
    pos: { type: Number, default: Date.now },
    name: { type: String, required: false },
    code: { type: String, required: false },
    hidden: { type: Boolean, required: false },
    conversion: { type: Number, required: false },
});
schema.plugin(timestamps);

mongoose.model('Prices', schema);