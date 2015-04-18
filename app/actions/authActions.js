var appDispatcher = require('../dispatcher/appDispatcher');
var appConstants = require('../constants/appConstants');
var firebaseAuth = require('../utils/firebase/firebaseAuth');

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
    firebaseAuth.createUser(user, (authObj) => {
      dispatcherCallback.call(null, authObj);
      routeChangeCb.call(null, authObj);
    });
  },
  loginWithPW(user, routeChangeCb){
    firebaseAuth.loginWithPW(user, routeChangeCb);
  },
  logout(){
    firebaseAuth.logout();
  }
};

module.exports = authActions;