var appDispatcher = require('../dispatcher/appDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var _state = {
  user: {
    firstName: '',
    lastName: '',
    email: ''
  }
};

function setState(newState){
  objectAssign(_state, newState);
  UserStore.emit(CHANGE_EVENT);
};

var userStore = objectAssign({}, EventEmitter.prototype, {
  getUser(){
    return _state.user;
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
    case appConstants.INIT_USER :
      setState({
        user: action.data
      });
    break;
    case appConstants.XXX :
      setState(action.data);
    default :
      return true;
  }
});

module.exports = userStore;