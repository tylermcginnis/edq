var ref = require('../../constants/fbref');

var formatEmailForFirebase = function(email){
  var key = email.replace('@', '^');
  if(key.indexOf('.') !== -1){
    return key.split('.').join('*');
  }
  return key;
};

var formatClassname = function(className){
  var hash = {
    ".": true, "#": true, "$": true, "[": true, "]": true
  };

  className = className.split('');
  var result = className.map(function(item){
    if(hash[item]){
      return ""
    }
    return item.toLowerCase();
  });
  return result.join('');
};

var fbHelpers = {
  addNewUserToFB: function(newUser){
    var key = formatEmailForFirebase(newUser.email);
    ref.child('user').child(key).set(newUser);
  },
  addNewClassToFB: function(newClass){
    var email = formatEmailForFirebase(ref.getAuth().password.email);
    ref.child('classes').child(email).child(formatClassname(newClass.name)).set(newClass);
  },
  removeClassFromFB: function(name){
    var email = formatEmailForFirebase(ref.getAuth().password.email);
    ref.child('classes').child(email).child(formatClassname(name)).remove();
  }
};

module.exports = fbHelpers;