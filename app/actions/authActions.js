var appDispatcher = require('../dispatcher/appDispatcher');
var appConstants = require('../constants/appConstants');
var firebaseUtils = require('../utils/firebaseUtils');

var dispatcherCallback = function(authObj) {
  if(authObj){
    appDispatcher.handleAction({
      actionType: appConstants.INIT_USER,
      data: authObj
    });
  }
};

var authActions = {
  registerUser: function(user, routeChangeCb){
    firebaseUtils.createUser(user, function (authObj){
      dispatcherCallback.call(null, authObj);
      routeChangeCb.call(null, authObj);
    });
  },
  loginWithPW: function(user, routeChangeCb){
    firebaseUtils.loginWithPW(user, routeChangeCb);
  },
  logout: function(){
    firebaseUtils.logout();
  }
};

module.exports = authActions;