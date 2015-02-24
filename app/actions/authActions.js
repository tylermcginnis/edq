var appDispatcher = require('../dispatcher/appDispatcher');
var appConstants = require('../constants/appConstants');
var firebaseUtils = require('../utils/firebaseUtils');

var authActions = {
  registerUser: function(user, routeChangeCb){
    debugger;
    firebaseUtils.createUser(user, routeChangeCb);

    //dispatch init user
  }
};

module.exports = authActions;