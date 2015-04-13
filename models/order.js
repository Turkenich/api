//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;


//schema
var schema = new Schema({
    orderId: { type: String, required: true, index: true},
    jewelleries: { type: String, required: true, index: true},
    name: { type: String, default:' ', required: false },
    desc: { type: String, default:' ', required: false },
    salePrice: { type: Number, default:0, required: false },
    settings: {
        workMinutePrice: { type: Number, required: false },
        USDtoILS: { type: Number, required: false },
        GBPtoILS: { type: Number, required: false },
        EURtoILS: { type: Number, required: false },
        silverPrice: { type: Number, required: false },
        brassPrice: { type: Number, required: false },
    }
});
schema.plugin(timestamps);

mongoose.model('Order', schema);