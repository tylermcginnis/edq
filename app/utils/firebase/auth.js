var ref = require('../../constants/fbref');
var classHelpers = require('./classHelpers');

var auth = {
  createUser(user, cb) {
    var loginObj = {email: user.email, password: user.password};
    ref.createUser(loginObj, (err, userData) => {
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
        var newUserRef = ref.child('users').push({firstName: user.firstName,lastName: user.lastName,email: user.email,uid: userData.uid});
        loginObj.pushId = newUserRef.key();
        this.loginWithPW(loginObj, cb);
      }
    });
  },
  loginWithPW(userObj, cb){
    ref.authWithPassword(userObj, (err, authData) => {
      if(err){
        console.log('Error on login:', err.message);
        cb(true);
      } else {
        this.onChange(true);
        authData.pushId = userObj.pushId;
        cb(false, authData);
      }
    });
  },
  isLoggedIn(){
    return localStorage.getItem('user') && true || ref.getAuth() || false;
  },
  logout(cb){
    ref.unauth();
    cb();
    this.onChange(false);
  }
};

module.exports = auth;