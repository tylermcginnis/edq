var appDispatcher = require('../dispatcher/appDispatcher');
var queueHelpers = require('../utils/firebase/queueHelpers');

var queueActions = {
  initQueue(){
    queueHelpers.fetchQueue((queue) => {
      appDispatcher.handleAction({
        actionType: appConstants.INIT_QUEUE,
        data: queue
      });
    });
  }
};

module.exports = queueActions;