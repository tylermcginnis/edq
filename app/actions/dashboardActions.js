var appDispatcher = require('../dispatcher/appDispatcher');
var appConstants = require('../constants/appConstants');
var classHelpers = require('../utils/firebase/classHelpers');

var dashboardActions = {
  addClass(userId, newClassName) {
    appDispatcher.handleAction({
      actionType: appConstants.ADD_CLASS,
      data: newClassName
    });
    classHelpers.addNewClassToFB(userId, newClassName);
  },
  getInitialClasses(userId){
    classHelpers.getClasses(userId, (classes) => {
      appDispatcher.handleAction({
        actionType: appConstants.INIT_CLASSES,
        data: classes
      });
    });
  }
};

module.exports = dashboardActions;