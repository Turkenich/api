//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;


//schema
var userSchema = new Schema({
    name     : { type: String, default: 'New User', required: true },
    email    : { type: String, default: 'New@User.com', required:true },
    image    : { type: String, default: ' ', required:true },
    pet      : { type: Schema.Types.ObjectId, default: null, ref: 'Pet' },
    donations: [
        { type: Schema.Types.ObjectId, ref: 'Donation' }
    ]
});
userSchema.plugin(timestamps);

mongoose.model('User', userSchema);