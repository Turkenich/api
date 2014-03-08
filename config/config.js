var config = {}
config.mongodb_uri = process.env.MONGO_LAB_URI || 'mongodb://localhost/test';
config.app_port = process.env.PORT || 3000;
module.exports = config;