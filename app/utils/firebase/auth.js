var ref = require('../../constants/fbref');
var helpers = require('./helpers');

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
        helpers.getUserIdWithEmail(user.email, (userId) => {
          var objToSave = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            uid: userData.uid
          };
          if(userId === -1){
            var newUserRef = ref.child('users').push(objToSave);
            loginObj.pushId = newUserRef.key();
          } else {
            ref.child(`users/${userId}/firstName`).set(objToSave.firstName);
            ref.child(`users/${userId}/lastName`).set(objToSave.lastName);
            loginObj.pushId = userId;
          }
          loginObj.firstName = user.firstName;
          loginObj.lastName = user.lastName;
          loginObj.email = user.email;
          this.loginWithPW(loginObj, cb);
        });
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
        if(userObj.pushId){
          localStorage.setItem('user', JSON.stringify(userObj));
          cb(false, userObj);
        } else {
          helpers.getStudentInfo(userObj.email, (userData) => {
            authData.pushId = userData.key;
            authData.firstName = userData.data.firstName;
            authData.lastName = userData.data.lastName;
            authData.email = userData.data.email
            localStorage.setItem('user', JSON.stringify(authData));
            cb(false, authData);
          });
        }
      }
    });
  },
  isLoggedIn(){
    return localStorage.getItem('user') && true || ref.getAuth() || false;
  },
  logout(cb){
    ref.unauth();
    localStorage.removeItem('user');
    this.onChange(false);
    cb();
  }
};

module.exports = auth;