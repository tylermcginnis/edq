var FBURL = require('./appConstants').FIREBASE_URL;
var Firebase = require('firebase');

module.exports = new Firebase(FBURL);