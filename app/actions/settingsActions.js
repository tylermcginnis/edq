var appDispatcher = require('../dispatcher/appDispatcher');
var appConstants = require('../constants/appConstants');
var classHelpers = require('../utils/firebase/classHelpers');

var settingsActions = {
  removeClass(userId, className, index, cb) {
    appDispatcher.handleAction({
      actionType: appConstants.REMOVE_CLASS,
      data: index
    });
    classHelpers.removeClass(userId, className, cb);
  },
  removeStudent(index, userId, className, email){
    appDispatcher.handleAction({
      actionType: appConstants.REMOVE_STUDENT,
      data: index
    });
    classHelpers.removeStudent(userId, className, email);
  },
  getStudents(userId, className, cb){
    classHelpers.getStudents(userId, className, (data) => {
      appDispatcher.handleAction({
        actionType: appConstants.INIT_MEMBERS,
        data: data
      });
    });
  },
  addStudent(obj){
    appDispatcher.handleAction({
      actionType: appConstants.ADD_STUDENT,
      data: {email: obj.email, firstName: obj.firstName, lastName: obj.lastName}
    });
    classHelpers.addStudent(obj);
  }
};

module.exports = settingsActions;