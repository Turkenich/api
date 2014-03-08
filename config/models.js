module.exports = function(mongoose) {
    //schemas
    var Pet = new mongoose.Schema({
        id       :  mongoose.Schema.ObjectId,
        name     : { type: String, required: true, index: {unique: true, dropDups: true} }
    });

    //models
    var models = {
        Pets: mongoose.model('Pets', Pet)
    };

    return models;
}