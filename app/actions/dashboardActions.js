var appDispatcher = require('../dispatcher/appDispatcher');
var appConstants = require('../constants/appConstants');
var fbHelpers = require('../utils/firebase/fbHelpers');

var dashboardActions = {
  addClass(newClass) {
    appDispatcher.handleAction({
      actionType: appConstants.ADD_CLASS,
      data: newClass
    });
    fbHelpers.addNewClassToFB(newClass);
  },
  getInitialClasses(){
    fbHelpers.getClasses((classes) => {
      appDispatcher.handleAction({
        actionType: appConstants.INIT_CLASSES,
        data: classes
      });
    });
  }
};

module.exports = dashboardActions;