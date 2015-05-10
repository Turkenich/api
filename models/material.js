//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;


//schema
var schema = new Schema({
    pos: { type: Number, default: Date.now },
    name: { type: String, required: false },
    price: { type: Number, required: false },
    weightUnit: { type: String, default:'gram', required: false },
    currency: { type: Schema.Types.ObjectId, ref: 'Prices', required: false },
});
schema.plugin(timestamps);

mongoose.model('Material', schema);