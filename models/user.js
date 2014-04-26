//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;


//schema
var userSchema = new Schema({
    name     : { type: String, default: 'New User', required: true },
    email    : { type: String, default: 'New@User.com', required:true },
    pet      : { type: Schema.Types.ObjectId, default: null, ref: 'User' }
});
userSchema.plugin(timestamps);

mongoose.model('User', userSchema);