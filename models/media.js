//module dependencies
var mongoose = require('mongoose'),
    timestamps = require('mongoose-timestamp'),
    Schema = mongoose.Schema;


//schema
var mediaSchema = new Schema({
    caption: {type: String, required: true},
    created_time: {type: Number, required: true},
    ext_id: {type: String, required:true},
    image: {type: String, required: true},
    link: {type: String, required: true},
    type: {type: String, enum: ['im', 'vd'], required: true },
    url: { type: String, required: true },
    user_id: {type: String, required: true},
    username: {type: String, required: true},
    video: {type: String, required: false},
    removed: {type:String, required:true, default:false},
    treat: {type:Schema.Types.ObjectId, required:false}
});
mediaSchema.plugin(timestamps);

mongoose.model('Media', mediaSchema);