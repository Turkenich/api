//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;


//schema
var mediaSchema = new Schema({
    url:    { type: String, required: true },
    type:   {type: String, enum: ['im', 'vd'], required: true }
});
mediaSchema.plugin(timestamps);

mongoose.model('Media', mediaSchema);