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
  getInitialClasses(){
    firebaseUtils.getClasses((classes) => {
      appDispatcher.handleAction({
        actionType: appConstants.INIT_CLASSES,
        data: classes
      });
    });
  }
};

module.exports = dashboardActions;