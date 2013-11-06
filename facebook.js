var db = require ('./db');

var passport = require('passport');
var fbgraph = require ('fbgraph');
var FacebookStrategy = require('passport-facebook').Strategy;

var FACEBOOK_APP_ID='533550670061356';
var FACEBOOK_APP_SECRET='9f206ea8ee4f976a9974a01762bfee41';
var FACEBOOK_APP_CALLBACKURL="http://localhost:8000/auth/facebook/callback";
var FACEBOOK_APP_SCOPE = ['email', 'user_about_me', 'user_birthday', 'user_activities', 'user_groups', 'user_interests', 'user_likes'];

passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: FACEBOOK_APP_CALLBACKURL
  },
  function(accessToken, refreshToken, profile, done) {
    
    fbgraph.setAccessToken(accessToken);

    db.User.findOne({'accounts.uid': profile.id, 'accounts.provider': 'facebook'}, function (err, oldUser){
      if (oldUser){
        console.log('Existing user: ' + oldUser.first_name);
        done(null, oldUser);
      } else {
        var newUser = new db.User();
        var account = {provider: "facebook", uid: profile.id};
        newUser.accounts.push(account);
        newUser.first_name = profile.name.givenName;
        newUser.save(function(err) {
          if (err) {throw err};
          console.log ('New user: ' + newUser.first_name);
          done (null, newUser);
        });
      }
    });
  }
));

passport.serializeUser(function (user, done) {
   done(null, user._id);
});

passport.deserializeUser(function (id, done) {
   done(null, id);
});

exports.initialize = function (){
  return passport.initialize();
};

exports.session = function (){
  return passport.session();
};

exports.authenticate = passport.authenticate('facebook', {scope: FACEBOOK_APP_SCOPE});

exports.callback = passport.authenticate('facebook', { successRedirect: '/form-fb',
                                                       failureRedirect: '/login' });


exports.form_fb = function (req, res){
  fbgraph.get("me?fields=first_name,last_name,email,birthday,gender", function (err, fbres) {
    res.render('form-fb', fbres);
  });
};

exports.submit2_fb = function (req, res){
  //validations...

  db.User.findById(req.user, function (err, user){
    user.fillWithForm (req.body, function(){
      fbgraph.get("me?fields=likes,activities,groups,interests", function (err, fbres){
        user.fb_raw = fbres;
        user.save(function (err, user){
          console.log("Usuario guardado: " + user);
          res.redirect('/review');
        });
      });
    });   
  });
};


 