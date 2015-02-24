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

var setState = function(newState){
  objectAssign(_state, newState);
  UserStore.emit(CHANGE_EVENT);
};

var userStore = objectAssign({}, EventEmitter.prototype, {
  getUser: function(){
    return _state.user;
  },
  addChangeListener: function(cb) {
    this.on(CHANGE_EVENT, cb);
  },
  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  }
});

appDispatcher.register(function(payload){
  var action = payload.action;
  switch(action.actionType) {
    case appConstants.XXX :
      setState(action.data);
    break;
    case appConstants.XXX :
      setState(action.data);
    default :
      return true;
  }
});

module.exports = userStore;