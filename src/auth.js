var FirebaseStrategy = require('passport-firebase-auth').Strategy;

passport.use(new FirebaseStrategy({
    firebaseProjectId: "test-firebase-eb0b3",
    authorizationURL: 'https://account.example.net/auth',
    callbackURL: 'https://www.example.net/auth/firebase/callback'
  },
  function(accessToken, refreshToken, decodedToken, cb) {
    User.findOrCreate(..., function (err, user) {
      return cb(err, user);
    });
  }
));

firebase.initializeApp({
     serviceAccount: "path/to/serviceAccountCredentials.json",
     databaseURL: "https://test-firebase-eb0b3.firebaseio.com"
 });

app.get('/auth/firebase',
  passport.authenticate('firebaseauth', { }));

app.get('/auth/firebase/callback', 
  passport.authenticate('firebaseauth', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });