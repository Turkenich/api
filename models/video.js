//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;


//schema
var videoSchema = new Schema({
    url:    { type: String, required: true }
});
videoSchema.plugin(timestamps);

mongoose.model('Video', videoSchema);