//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;

//schema
var petSchema = new Schema({
    name     : { type: String, required: true },
    kennel   : { type: Schema.Types.ObjectId, ref: 'Kennel' },
    owner    : { type: Schema.Types.ObjectId, ref: 'User' },
    videos   : [{ type: Schema.Types.ObjectId, ref: 'Video' }]
});
petSchema.plugin(timestamps);

mongoose.model('Pet', petSchema);