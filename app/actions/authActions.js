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

function resetUser(){
  appDispatcher.handleAction({
    actionType: appConstants.RESET_USER,
    data: {}
  });
}

var authActions = {
  registerUser(user, routeChangeCb){
    auth.createUser(user, (err, data) => {
      if(err){
        console.log('Error on Create User');
      } else {
        dispatcherCallback.call(null, data);
        routeChangeCb.call(null, data);
      }
    });
  },
  loginWithPW(user, routeChangeCb){
    auth.loginWithPW(user, (err, data) => {
      if(err){
        console.log('Error on Login');
      } else {
        routeChangeCb.call(null, data);
        dispatcherCallback.call(null, data);
      }
    });
  },
  logout(){
    auth.logout(resetUser);
  }
};

module.exports = authActions;