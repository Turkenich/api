var config = {}
config.mongodb_uri = process.env.MONGOLAB_URI || 'mongodb://localhost/treatsforlife_dev';
config.app_port = process.env.PORT || 3000;
module.exports = config;