//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;

//schema
var petSchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    media: { type: Schema.Types.ObjectId, ref: 'Media', required: true },
    kennel: { type: Schema.Types.ObjectId, ref: 'Kennel', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    donations: [
        { type: Schema.Types.ObjectId, ref: 'Donation' }
    ]
});
petSchema.plugin(timestamps);

mongoose.model('Pet', petSchema);