var appDispatcher = require('../dispatcher/appDispatcher');
var appConstants = require('../constants/appConstants');
var helperFns = require('../utils/firebase/helperFns');

var settingsActions = {
  removeClass(name, index, cb) {
    appDispatcher.handleAction({
      actionType: appConstants.REMOVE_CLASS,
      data: index
    });
    helperFns.removeClass(name, cb);
  },
  removeStudent(index, email){
    appDispatcher.handleAction({
      actionType: appConstants.REMOVE_STUDENT,
      data: index
    });
    helperFns.removeClass(name);
  },
  getStudents(){

  }
};

module.exports = settingsActions;