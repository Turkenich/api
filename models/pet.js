//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;

//schema
var petSchema = new Schema({
    name     : { type: String, required: true },
    image     : { type: String, required: true },
    kennel   : { type: Schema.Types.ObjectId, ref: 'Kennel' },
    owner    : { type: Schema.Types.ObjectId, ref: 'User' },
    media    : [{ type: Schema.Types.ObjectId, ref: 'Media' }]
});
petSchema.plugin(timestamps);

mongoose.model('Pet', petSchema);