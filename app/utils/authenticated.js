var React = require('react');
var Login = require("../components/login-register/Login");
var firebaseAuth = require('./firebase/firebaseAuth');

var requireAuth = (Component) => {
  class Authenticated extends React.Component{
    render(){
      return <Component {...this.props} />
    }
  }

  Authenticated.willTransitionTo = function (transition) {
    var nextPath = transition.path;
    if(!firebaseAuth.isLoggedIn()){
      transition.redirect('login', {}, {'nextPath': nextPath});
    }
  };

  return Authenticated;
}

module.exports = requireAuth;
