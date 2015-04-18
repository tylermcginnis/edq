var appDispatcher = require('../dispatcher/appDispatcher');
var appConstants = require('../constants/appConstants');
var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _state = {
  classes: [],
  students: []
};

function setState(newState){
  objectAssign(_state, newState);
  classesStore.emit(CHANGE_EVENT);
};

var classesStore = objectAssign({}, EventEmitter.prototype, {
  getClasses(){
    return _state.classes;
  },
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
    case appConstants.INIT_CLASSES :
      setState({
        classes: action.data
      });
    default :
      return true;
  }
});

module.exports = classesStore;