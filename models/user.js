//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;


//schema
var userSchema = new Schema({
    name     : { type: String, required: true },
    email    : { type: String, required:true },
    pet      : { type: Schema.Types.ObjectId, ref: 'User' }
});
userSchema.plugin(timestamps);

mongoose.model('User', userSchema);