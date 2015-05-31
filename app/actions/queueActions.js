var appDispatcher = require('../dispatcher/appDispatcher');
var queueHelpers = require('../utils/firebase/queueHelpers');

var queueActions = {
  initQueue(className){
    queueHelpers.fetchQueue(className, (queue) => {
      appDispatcher.handleAction({
        actionType: appConstants.INIT_QUEUE,
        data: queue
      });
    });
  }
};

module.exports = queueActions;