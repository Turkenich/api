//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;


//schema
var kennelSchema = new Schema({
    name     : { type: String, default:'Untitled Kennel', required: true },
    username : { type: String, default:'username1,username2,username3', required: true },
    info     : { type: String, default:' ', required: false },
    link     : { type: String, default:' ', required: false },
    phone     : { type: String, default:' ', required: false },
    latlon     : { type: String, default:' ', required: false },
    address  : { type: String, default:' ', required: false }
});
kennelSchema.plugin(timestamps);

mongoose.model('Kennel', kennelSchema);