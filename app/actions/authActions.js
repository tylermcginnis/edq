var appDispatcher = require('../dispatcher/appDispatcher');
var appConstants = require('../constants/appConstants');
var auth = require('../utils/firebase/auth');

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
    auth.createUser(user, (authObj) => {
      dispatcherCallback.call(null, authObj);
      routeChangeCb.call(null, authObj);
    });
  },
  loginWithPW(user, routeChangeCb){
    auth.loginWithPW(user, routeChangeCb);
  },
  logout(){
    auth.logout();
  }
};

module.exports = authActions;