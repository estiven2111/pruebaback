const {Artist} = require("../db")
const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const {artistById} = require("../Controllers/artistControllers/artistById")
const generateJWT = require("../../utils/generateJWT")
const {URL_BACK} = require("../env")
require("dotenv").config();
const {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET} = process.env;

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${URL_BACK}/artist/auth/google/callback`,
      // callbackURL: "https://pruebaback-production-0050.up.railway.app/artist/auth/google/callback",
      
      scope: ['profile', 'email'],
      passReqToCallback: true
  },
  async (req, accessToken, refreshToken, profile, done) => {

    const newArtist = await Artist.findOne({
        where: {
          email : profile._json.email,
      }
    })

  if(newArtist) {
          const artist = await artistById(newArtist.id)
          artist.token =  generateJWT(artist.id, artist.name)
          done(null,artist)
    } else {

      const artistByGoogle = await Artist.create({

          name : profile.name.givenName,
          lastname: profile.name.familyName,
          email : profile._json.email,
          nickName: profile.name.familyName.substring(0,3) + profile.name.givenName.substring(0,3) + Math.floor(Math.random() * 1000),
          password: '',
          profilePhoto : profile._json.picture
    })
    
    artistByGoogle.token = generateJWT(artistByGoogle.id, artistByGoogle.name);
    await artistByGoogle.save();
    
    done(null, artistByGoogle)

    }
  }
));


passport.serializeUser((artist, done) => {
  done(null, artist.id);
});

passport.deserializeUser(async (id, done) => {
    const artist = await Artist.findByPk(id).catch((err) => {
      done(err, null)
    });
    if(artist) done(null, artist);
});


module.exports = passport