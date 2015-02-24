var appDispatcher = require('../dispatcher/appDispatcher');
var appConstants = require('../constants/appConstants');
var firebaseUtils = require('../utils/firebaseUtils');

var dashboardActions = {
  addClass: function(newClass) {
    appDispatcher.handleAction({
      actionType: appConstants.ADD_CLASS,
      data: newClass
    });
    // FirebaseUtils.addClassToFirebase(klass);
  },
  removeClass: function(index) {
    appDispatcher.handleAction({
      actionType: appConstants.REMOVE_CLASS,
      data: index
    });
    // FirebaseUtils.removeClass(name, email);
  },
};

module.exports = dashboardActions;