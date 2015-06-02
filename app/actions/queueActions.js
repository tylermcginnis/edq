var appDispatcher = require('../dispatcher/appDispatcher');
var queueHelpers = require('../utils/firebase/queueHelpers');
var appConstants = require('../constants/appConstants');
var helpers = require('../utils/firebase/helpers');

var queueActions = {
  initQueue(userId, className){
    queueHelpers.init(userId, className, (queueData) => {
      appDispatcher.handleAction({
        actionType: appConstants.INIT_QUEUE,
        data: queueData
      });
    });
  }
};

module.exports = queueActions;