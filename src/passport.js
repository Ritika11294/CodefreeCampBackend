const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('./models/googleOauth.model');
const jwt = require('jsonwebtoken');

passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser(function (user, done) {
    done(null, user);
});


const newToken = (user) => {
    return jwt.sign({ user }, process.env.JWT_SECRET_KEY)
}

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
    passReqToCallback: true
},
    async function (request, accessToken, refreshToken, profile, done) {
        // return done(null, profile);
        try {
            // Check if user already exists in the database
            const existingUser = await User.findOne({ email: profile.email });
            console.log(existingUser, "29");

            if (existingUser) {
                let token = newToken(existingUser);
                console.log(token);
                return done(null, existingUser, token);
               
            }

            // If user doesn't exist, create a new user
            const newUser = new User({
                name: profile.displayName,
                email: profile.emails[0].value,
                googleId: profile.id,
            });

            await newUser.save();
            let token = newToken(newUser)
            console.log(token);
            return done(null, newUser, token);
        } catch (err) {
            return done(err, null);
        }
    }
));
