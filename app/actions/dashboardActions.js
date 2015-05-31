var appDispatcher = require('../dispatcher/appDispatcher');
var appConstants = require('../constants/appConstants');
var classHelpers = require('../utils/firebase/classHelpers');

var dashboardActions = {
  addClass(newClass) {
    appDispatcher.handleAction({
      actionType: appConstants.ADD_CLASS,
      data: newClass
    });
    classHelpers.addNewClassToFB(newClass);
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