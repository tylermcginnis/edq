var appDispatcher = require('../dispatcher/appDispatcher');
var appConstants = require('../constants/appConstants');
var firebaseUtils = require('../utils/firebase/firebaseUtils');

function dispatcherCallback(authObj) {
  if(authObj){
    appDispatcher.handleAction({
      actionType: appConstants.INIT_USER,
      data: authObj
    });
  }
};

var authActions = {
  registerUser(user, routeChangeCb){
    firebaseUtils.createUser(user, (authObj) => {
      dispatcherCallback.call(null, authObj);
      routeChangeCb.call(null, authObj);
    });
  },
  loginWithPW(user, routeChangeCb){
    firebaseUtils.loginWithPW(user, routeChangeCb);
  },
  logout(){
    firebaseUtils.logout();
  }
};

module.exports = authActions;