//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;


//schema
var schema = new Schema({
    modelType: { type: String, required: false, index: true},
    modelId: { type: String, required: false, index: true},
    name: { type: String, required: false, index: true},
    elements: { type: String, required: false, index: false},
    image: { type: String, default:null, required: false },
    desc: { type: String, default:null, required: false },
    sets: { type: String, default:null, required: false },
    comments: { type: String, default:null, required: false },
    engDesc: { type: String, default:null, required: false },
    requiredTime: { type: Number, default:null, required: false },
    weight: { type: Number, default:null, required: false },
    salePrice: { type: Number, default:null, required: false },
    prices: { type: String, default:null, required: false },
    weights: { type: String, default:null, required: false },
    costs: { type: String, default:null, required: false },
    metals: { type: String, default:null, required: false },
});
schema.plugin(timestamps);

mongoose.model('Model', schema);