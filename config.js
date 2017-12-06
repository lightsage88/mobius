//add a database for this from your local mongo server
exports.DATABASE_URL = process.env.DATABASE_URL || global.DATABASE_URL || 'mongodb://lightsage88:Walruses8@ds131826.mlab.com:31826/mobius';

//we set up these exports as such:
//the port will be whatever its working on if defined through some other means, or 8080

exports.PORT = process.env.PORT || 8080;
//same kinda deal with jwt_secret, but its going to be 'lloyd'
exports.JWT_SECRET = process.env.JWT_SECRET || 'lloyd';
//the jwt expiration will occut after 1 day, in which case a user will ahve to get another one

exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '1d';