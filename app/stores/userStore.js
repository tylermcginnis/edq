var appDispatcher = require('../dispatcher/appDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

function setState(newState){
  var _state = JSON.parse(localStorage.getItem('user')) || {};
  objectAssign(_state, newState.user);
  localStorage.setItem('user', JSON.stringify(_state));
  userStore.emit(CHANGE_EVENT);
};

function resetUser(){
  localStorage.removeItem('user');
  console.log('The new user state is ', localStorage.getItem('user'))
}

var userStore = objectAssign({}, EventEmitter.prototype, {
  getUser(){
    return JSON.parse(localStorage.getItem('user'));
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
    case appConstants.RESET_USER :
      resetUser();
    break;
    default :
      return true;
  }
});

module.exports = userStore;