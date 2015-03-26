var Firebase = require('firebase');
var firebaseAuth = require('./firebaseAuth');
var fbHelpers = require('./fbHelpers');

var firebaseUtils = {
  createUser: firebaseAuth.createUser,
  loginWithPW: firebaseAuth.loginWithPW,
  isLoggedIn: firebaseAuth.isLoggedIn,
  addClassToFB: fbHelpers.addNewClassToFB,
  removeClass: fbHelpers.removeClassFromFB,
  getClasses: fbHelpers.getClasses,
  getStudents: fbHelpers.getStudents,
  logout: firebaseAuth.logout
};

module.exports = firebaseUtils;