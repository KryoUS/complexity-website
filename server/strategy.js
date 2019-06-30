//Bnet Strategy from (https://github.com/Blizzard/passport-bnet)
const BnetStrategy = require('passport-bnet');
const { BLIZZ_API_CLIENT_ID, BLIZZ_API_CLIENT_SECRET, DEV } = process.env;

module.exports = new BnetStrategy({
    clientID: BLIZZ_API_CLIENT_ID,
    clientSecret: BLIZZ_API_CLIENT_SECRET,
    scope: "wow.profile sc2.profile",
    callbackURL: DEV ? "https://localhost:3050/auth/bnet/callback" : "https://www.complexityguild.net/auth/bnet/callback"
},
function(accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
});