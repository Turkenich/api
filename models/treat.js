//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;


//schema
var treatSchema = new Schema({
    name     : { type: String, default:'Untitled Treat', required: true },
    image  : { type: String, default:' ', required: true },
    price  : { type: Number, default:0, required: true }
});
treatSchema.plugin(timestamps);

mongoose.model('Treat', treatSchema);