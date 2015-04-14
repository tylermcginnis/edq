var appDispatcher = require('../dispatcher/appDispatcher');
var appConstants = require('../constants/appConstants');
var firebaseUtils = require('../utils/firebase/firebaseUtils');

var settingsActions = {
  removeClass(name, index, cb) {
    appDispatcher.handleAction({
      actionType: appConstants.REMOVE_CLASS,
      data: index
    });
    firebaseUtils.removeClass(name);
  },
  removeStudent(index, email){
    appDispatcher.handleAction({
      actionType: appConstants.REMOVE_STUDENT,
      data: index
    });
    firebaseUtils.removeClass(name);
  },
  getStudents(){

  }
};

module.exports = settingsActions;