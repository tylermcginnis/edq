var appDispatcher = require('../dispatcher/appDispatcher');
var appConstants = require('../constants/appConstants');
var fbHelpers = require('../utils/firebase/fbHelpers');

var settingsActions = {
  removeClass(name, index, cb) {
    appDispatcher.handleAction({
      actionType: appConstants.REMOVE_CLASS,
      data: index
    });
    fbHelpers.removeClass(name, cb);
  },
  removeStudent(index, email){
    appDispatcher.handleAction({
      actionType: appConstants.REMOVE_STUDENT,
      data: index
    });
    fbHelpers.removeClass(name);
  },
  getStudents(){

  }
};

module.exports = settingsActions;