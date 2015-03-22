var appDispatcher = require('../dispatcher/appDispatcher');
var appConstants = require('../constants/appConstants');
var firebaseUtils = require('../utils/firebase/firebaseUtils');

var dashboardActions = {
  addClass(newClass) {
    appDispatcher.handleAction({
      actionType: appConstants.ADD_CLASS,
      data: newClass
    });
    firebaseUtils.addClassToFB(newClass);
  },
  removeClass(name, index) {
    appDispatcher.handleAction({
      actionType: appConstants.REMOVE_CLASS,
      data: index
    });
    firebaseUtils.removeClass(name);
  },
};

module.exports = dashboardActions;