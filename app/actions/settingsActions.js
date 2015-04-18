var appDispatcher = require('../dispatcher/appDispatcher');
var appConstants = require('../constants/appConstants');
var classHelpers = require('../utils/firebase/classHelpers');

var settingsActions = {
  removeClass(name, index, cb) {
    appDispatcher.handleAction({
      actionType: appConstants.REMOVE_CLASS,
      data: index
    });
    classHelpers.removeClass(name, cb);
  },
  removeStudent(index, email){
    appDispatcher.handleAction({
      actionType: appConstants.REMOVE_STUDENT,
      data: index
    });
    classHelpers.removeClass(name);
  },
  getStudents(){

  }
};

module.exports = settingsActions;