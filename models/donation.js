//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;


//schema
var donationSchema = new Schema({
    treat  : { type:Schema.Types.ObjectId, default:null, required:false },
    user   : { type:Schema.Types.ObjectId, default:null, required:false }
});
donationSchema.plugin(timestamps);

mongoose.model('Donation', donationSchema);