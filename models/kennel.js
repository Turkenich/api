//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;


//schema
var kennelSchema = new Schema({
    name     : { type: String, required: true },
    address  : String
});
kennelSchema.plugin(timestamps);

mongoose.model('Kennel', kennelSchema);