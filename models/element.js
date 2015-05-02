//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;


//schema
var schema = new Schema({
    elementType: { type: Schema.Types.ObjectId, ref: 'ElementType', required: false },
    material: { type: Schema.Types.ObjectId, ref: 'Material', required: false },
    coating: { type: Schema.Types.ObjectId, ref: 'Coating', required: false },
    elementFeatures: { type: Schema.Types.ObjectId, ref: 'ElementFeatures', required: false },
    provider: { type: Schema.Types.ObjectId, ref: 'Provider', required: false },
    providerCatalog: { type: String, default:null, required: false },
    providerDesc: { type: String, default:null, required: false },
    measureUnitWeight: { type: Number, default:null, required: false },
    workUnit: { type: String, enum: ['gram', 'centimeter', 'unit'], default:'unit', required: false },
    workUnitPrice: { type: Number, default:null, required: false },
    workUnitCurrency: { type: Schema.Types.ObjectId, ref: 'Prices', required: false },
    name: { type: String, default:null, required: false },
    desc: { type: String, default:null, required: false },
    image: { type: String, default:null, required: false },
    waste: { type: Number, default:null, required: false },
    length: { type: Number, default:null, required: false },
    width: { type: Number, default:null, required: false },
    thickness: { type: Number, default:null, required: false },
});
schema.plugin(timestamps);

mongoose.model('Element', schema);