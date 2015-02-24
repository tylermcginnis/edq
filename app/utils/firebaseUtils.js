var Firebase = require('firebase');
var appConstants = require('../constants/appConstants');
var forge = appConstants.FIREBASE_URL;
var ref = new Firebase(forge);
var cachedUser = null;

var formatEmailForFirebase =  function(email){
  var key = email.replace('@', '^');
  if(key.indexOf('.') !== -1){
    return key.split('.').join('*');
  }
  return key;
};

var addNewUserToFB = function(newUser){
  var key = formatEmailForFirebase(newUser.email);
  ref.child('user').child(key).set(newUser);
};

var firebaseUtils = {
  createUser: function(user, cb) {
    var loginObj = {email: user.email, password: user.password};
    ref.createUser(loginObj, function(err) {
      if (err) {
        switch (err.code) {
          case "EMAIL_TAKEN":
            console.log("The new user account cannot be created because the email is already in use.");
            break;
          case "INVALID_EMAIL":
            console.log("The specified email is not a valid email.");
            break;
          default:
            console.log("Error creating user:", err);
        }
      } else {
          this.loginWithPW(loginObj, function(authData){
            addNewUserToFB({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              uid: authData.uid,
              token: authData.token
            });
          }, cb);
      }
    }.bind(this));
  },
  loginWithPW: function(userObj, cb, cbOnRegister){
    ref.authWithPassword(userObj, function(err, authData){
      if(err){
        console.log('Error on login:', err.message);
        cbOnRegister && cbOnRegister(false);
      } else {
        cachedUser = authData;
        cb(authData);
        this.onChange(true);
        cbOnRegister && cbOnRegister(true);
      }
    }.bind(this));
  },
  isLoggedIn: function(){
    return cachedUser && true || ref.getAuth() || false;
  },
  logout: function(){
    ref.unauth();
    cachedUser = null;
    this.onChange(false);
  }
};

module.exports = firebaseUtils;