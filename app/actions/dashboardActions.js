var appDispatcher = require('../dispatcher/appDispatcher');
var appConstants = require('../constants/appConstants');
var helperFns = require('../utils/firebase/helperFns');

var dashboardActions = {
  addClass(newClass) {
    appDispatcher.handleAction({
      actionType: appConstants.ADD_CLASS,
      data: newClass
    });
    helperFns.addNewClassToFB(newClass);
  },
  getInitialClasses(){
    helperFns.getClasses((classes) => {
      appDispatcher.handleAction({
        actionType: appConstants.INIT_CLASSES,
        data: classes
      });
    });
  }
};

module.exports = dashboardActions;