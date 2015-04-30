//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;


//schema
var schema = new Schema({
    orderId: { type: String, required: false, index: true},
    models: { type: String, required: false, index: true},
    desc: { type: String, default:null, required: false },
    salePrice: { type: Number, default:0, required: false },
});
schema.plugin(timestamps);

mongoose.model('Order', schema);