//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;


//schema
var donationSchema = new Schema({
    paypalItem: { type: Number, required: false },
    payed: { type: Boolean, default:false, required: true },
    given: { type: Boolean, default:false, required: true },
    media: { type: Schema.Types.ObjectId, ref: 'Media', default: null, required: false },
    treat: { type: Schema.Types.ObjectId, ref: 'Treat', default: null, required: false },
    user: { type: Schema.Types.ObjectId, ref: 'User', default: null, required: false },
    pet: { type: Schema.Types.ObjectId, ref: 'Pet', default: null, required: false }
});
donationSchema.plugin(timestamps);

mongoose.model('Donation', donationSchema);