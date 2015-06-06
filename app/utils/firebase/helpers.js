var ref = require('../../constants/fbref');

var helpers = {
  toArray(obj){
    var arr = [];
    for(var key in obj){
      if(this.isObject(obj[key])){
        obj[key].key = key;
      }
      arr.push(obj[key]);
    }
    return arr;
  },
  isObject(obj){
    return Object.prototype.toString.call(obj) === '[object Object]' ? true : false;
  },
  getStudentId(email, cbOrClassId, cb){
    if(cb){
      ref.child(`classes/${cbOrClassId}/students`).once('value', (snapshot) => {
        var data = snapshot.val();
        for(var key in data){
          if(data[key].email === email){
            cb(key);
          }
        }
      });
    } else {
      ref.child(`users`).on('value', (snapshot) => {
        var data = snapshot.val();
        for(var key in data){
          if(data[key].email === email){
            cbOrClassId(key);
          }
        }
      });
    }
  },
  getCurrentUserId(){
    return JSON.parse(localStorage.getItem('user')).pushId;
  }
};

module.exports = helpers;