module.exports = {
    development: {
        db: 'mongodb://localhost/treatsforlife_dev',
        app: {
            port: 3000
        }
    },
    staging: {},
    production: {
        db: process.env.MONGOLAB_URI,
        app: {
            port: process.env.PORT
        }
    }
};