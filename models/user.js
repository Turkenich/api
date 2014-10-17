//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;


//schema
var userSchema = new Schema({
    name     : { type: String, default: 'New User', required: true },
    email    : { type: String, default: 'New@User.com', required:true },
    image    : { type: String, default: ' ', required:true },
    fb_id    : { type: String, default: ' ', required:true },
    fb_at    : { type: String, default: ' ', required:true },
    push_token    : { type: String, default: ' ', required:false },
    pet      : { type: Schema.Types.ObjectId, default: null, ref: 'Pet' },
});
userSchema.plugin(timestamps);

mongoose.model('User', userSchema);