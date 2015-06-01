var appDispatcher = require('../dispatcher/appDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _state = {
  classes: [],
  members: []
};

function setState(newState){
  objectAssign(_state, newState);
  classesStore.emit(CHANGE_EVENT);
};

var classesStore = objectAssign({}, EventEmitter.prototype, {
  getClasses(){
    return _state.classes;
  },
  getMembers(){
    return _state.members;
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
    case appConstants.ADD_CLASS :
      setState({
        classes: _state.classes.concat([action.data])
      });
    break;
    case appConstants.REMOVE_CLASS :
      var ref = _state.classes.slice(0);
      for(var i = 0; i < ref.length; i++){
        if(ref[i].name === action.data){
          ref.splice(i, 1);
          break;
        }
      }
      setState({
        classes: ref
      });
    break;
    case appConstants.INIT_CLASSES :
      setState({
        classes: action.data
      });
    break;
    case appConstants.INIT_MEMBERS :
      setState({
        members: action.data
      });
    break;
    case appConstants.ADD_STUDENT :
      var arrRef = _state.members;
      arrRef.push(action.data);
      setState({
        members: arrRef
      });
    break;
    case appConstants.REMOVE_STUDENT :
      var ref = _state.members.slice(0);
      ref.splice(action.data, 1);
      setState({
        members: ref
      });
    default :
      return true;
  }
});

module.exports = classesStore;