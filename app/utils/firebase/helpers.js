var ref = require('../../constants/fbref');

var helpers = {
  toArray(obj){
    var arr = [];
    for(var key in obj){
      arr.push(obj[key]);
    }
    return arr;
  },
  getClassId(teacherId, className, cb){
    ref.child(`users/${teacherId}/classes`).once('value', (snapshot) => {
      var classes = snapshot.val();
      for(var key in classes){
        if(classes[key].name === className && classes[key].isTeacher === true){
          cb(key);
        }
      }
    });
  }
};

module.exports = helpers;