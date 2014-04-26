//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;


//schema
var donationSchema = new Schema({
    name     : { type: String, default:'Untitled Donation', required: true },
    image  : { type: String, default:' ', required: true },
    price  : { type: Number, default:'5', required: true }
});
donationSchema.plugin(timestamps);

mongoose.model('Donation', donationSchema);