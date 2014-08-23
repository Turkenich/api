//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;


//schema
var treatSchema = new Schema({
    name     : { type: String, default:'Untitled Treat', required: true },
    image  : { type: String, default:' ', required: true },
    price  : { type: Number, default:0, required: true },
    desc  : { type: String, default: ' ', required: true },
    fixed  : { type: Boolean, default:false, required: true },
    order  : { type: Number, default:0, required: true },
    cart  : { type: Boolean, default:false, required: false }
});
treatSchema.plugin(timestamps);

mongoose.model('Treat', treatSchema);