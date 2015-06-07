module.exports = {
    development: {
        db: 'mongodb://127.0.0.1/turkenich_dev',
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