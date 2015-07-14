//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;


//schema
var schema = new Schema({
    name: { type: String, required: false, index: true},
    models: { type: String, required: false, index: false},
    desc: { type: String, default:null, required: false },
    comments: { type: String, default:null, required: false },
    engDesc: { type: String, default:null, required: false },
    salePrice: { type: Number, default:0, required: false },
    prices: { type: String, default:null, required: false },
});
schema.plugin(timestamps);

mongoose.model('Order', schema);
