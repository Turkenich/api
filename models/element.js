//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;


//schema
var schema = new Schema({
    elementType: { type: Schema.Types.ObjectId, ref: 'elementType', required: false },
    material: { type: Schema.Types.ObjectId, ref: 'material', required: false },
    coating: { type: Schema.Types.ObjectId, ref: 'coating', required: false },
    elementFeatures: { type: Schema.Types.ObjectId, ref: 'elementFeatures', required: false },
    provider: { type: Schema.Types.ObjectId, ref: 'provider', required: false },
    providerCatalog: { type: String, default:' ', required: false },
    providerDesc: { type: String, default:' ', required: false },
    measureUnit: { type: String, enum: ['gram', 'centimeter', 'unit'], default:'gram', required: false },
    measureUnitWeight: { type: Number, default:0, required: false },
    workUnit: { type: String, enum: ['gram', 'centimeter', 'unit'], default:'gram', required: false },
    workUnitWeight: { type: Number, default:0, required: false },
    workUnitPrice: { type: Number, default:0, required: false },
    workUnitCurrency: { type: String, enum: ['USD', 'EUR', 'GBP', 'ILS'], default:'USD', required: false },
    desc: { type: String, default:' ', required: false },
    image: { type: String, default:' ', required: false },
    waste: { type: Number, default:0, required: false },
    length: { type: Number, default:0, required: false },
    width: { type: Number, default:0, required: false },
    thickness: { type: Number, default:0, required: false },
});
schema.plugin(timestamps);

mongoose.model('Element', schema);