var appDispatcher = require('../dispatcher/appDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _state = {
  queue: [1,2,3,4]
};

function setState(newState){
  objectAssign(_state, newState);
  classesStore.emit(CHANGE_EVENT);
};

var queueStore = objectAssign({}, EventEmitter.prototype, {
  getQueue(){
    return _state.queue;
  },
  addChangeListener(cb){
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener(cb){
    this.removeListener(CHANGE_EVENT, cb);
  }
});

appDispatcher.register((payload) => {
  var action = payload.action;
  switch(action.actionType) {
    case appConstants.ADD_TO_QUEUE :
      setState({
        classes: _state.queue.concat([action.data])
      });
    break;
    default :
      return true;
  }
});

module.exports = queueStore;