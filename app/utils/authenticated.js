var Login = require("../components/login-register/Login");
var firebaseUtils = require('./firebase/firebaseUtils');

var Authenticated = {
  statics: {
    willTransitionTo(transition){
      var nextPath = transition.path;
      if(!firebaseUtils.isLoggedIn()){
        transition.redirect('login', {}, {'nextPath': nextPath});
      }
    }
  }
};

module.exports = Authenticated;