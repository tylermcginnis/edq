var appDispatcher = require('../dispatcher/appDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _state = {
  classes: []
};

var setState = function(newState){
  objectAssign(_state, newState);
  dashboardStore.emit(CHANGE_EVENT);
};

var dashboardStore = objectAssign({}, EventEmitter.prototype, {
  getClasses: function(){
    return _state.classes;
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
    case appConstants.ADD_CLASS :
      setState({
        classes: _state.classes.concat([action.data])
      });
    break;
    case appConstants.REMOVE_CLASS :
      var ref = _state.classes.slice(0);
      ref.splice(action.data, 1);
      setState({
        classes: ref
      });
    default :
      return true;
  }
});

module.exports = dashboardStore;