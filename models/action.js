//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;


//schema
var actionSchema = new Schema({
    type     : {type: String, required: true },
    pet      : { type: Schema.Types.ObjectId, ref: 'Pet' },
    user     : { type: Schema.Types.ObjectId, ref: 'User' }
});
actionSchema.plugin(timestamps);

mongoose.model('Action', actionSchema);