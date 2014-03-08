var _ = require('lodash');
var timestamps = require('mongoose-timestamp');

module.exports = function(mongoose) {
    // schemas //
    var Schema = mongoose.Schema;
    var schemas = {
        Action: new Schema({
            type     : {type: String, required: true },
            pet      : { type: Schema.Types.ObjectId, ref: 'Pet' },
            user     : { type: Schema.Types.ObjectId, ref: 'User' },
        }),
        Kennel: new Schema({
            name     : { type: String, required: true },
            address  : String
        }),
        Pet: new Schema({
            name     : { type: String, required: true },
            kennel   : { type: Schema.Types.ObjectId, ref: 'Kennel' },
            owner    : { type: Schema.Types.ObjectId, ref: 'User' },
            videos   : [{ type: Schema.Types.ObjectId, ref: 'Video' }]
        }),
        User: new Schema({
            name     : { type: String, required: true },
            pet      : { type: Schema.Types.ObjectId, ref: 'Pet' },
        }),
        Video: new Schema({
            url      : { type: String, required: true }
        })
    }

    _.forEach(schemas, function(schema) {
       schema.plugin(timestamps);
    });


    // models //
    var models = {
        Action : mongoose.model('Action', schemas.Action),
        Kennel : mongoose.model('Kennel', schemas.Kennel),
        Pet    : mongoose.model('Pet', schemas.Pet),
        User   : mongoose.model('User', schemas.User),
        Video  : mongoose.model('Video', schemas.Video)
    };

    return models;
}