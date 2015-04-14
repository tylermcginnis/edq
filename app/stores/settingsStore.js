var appDispatcher = require('../dispatcher/appDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _state = {
  students: []
};

function setState(newState){
  objectAssign(_state, newState);
  settingsStore.emit(CHANGE_EVENT);
};

var settingsStore = objectAssign({}, EventEmitter.prototype, {
  getStudents(){
    return _state.students;
  },
  addChangeListener(cb) {
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }
});

appDispatcher.register((payload) => {
  var action = payload.action;
  switch(action.actionType) {
    case appConstants.INIT_CLASSES :
      setState({
        classes: action.data
      });
    default :
      return true;
  }
});

module.exports = settingsStore;