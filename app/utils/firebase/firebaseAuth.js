var ref = require('../../constants/fbref');
var fbHelpers = require('./fbHelpers');
var cachedUser = null;

var firebaseAuth = {
  createUser(user, cb) {
    var loginObj = {email: user.email, password: user.password};
    ref.createUser(loginObj, (err) => {
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
          this.loginWithPW(loginObj, (authData) => {
            fbHelpers.addNewUserToFB({
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              uid: authData.uid,
              token: authData.token
            });
          }, cb);
      }
    });
  },
  loginWithPW(userObj, cb, cbOnRegister){
    ref.authWithPassword(userObj, (err, authData) => {
      if(err){
        console.log('Error on login:', err.message);
        cbOnRegister && cbOnRegister(false);
      } else {
        cachedUser = authData;
        cb(authData);
        this.onChange(true);
        cbOnRegister && cbOnRegister(true);
      }
    });
  },
  isLoggedIn(){
    return cachedUser && true || ref.getAuth() || false;
  },
  logout(){
    ref.unauth();
    cachedUser = null;
    this.onChange(false);
  },
  getUser(){
    return cachedUser || ref.getAuth();
  }
};

module.exports = firebaseAuth;