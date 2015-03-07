var ref = require('../../constants/fbref');

var formatEmailForFirebase = function(email){
  var key = email.replace('@', '^');
  if(key.indexOf('.') !== -1){
    return key.split('.').join('*');
  }
  return key;
};

var prepFBEndpoint = function(endpoint){
  var hash = {
    ".": true, "#": true, "$": true, "[": true, "]": true
  };

  endpoint = endpoint.split('');
  var result = endpoint.map(function(item){
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
    ref.child('classes').child(email).child(prepFBEndpoint(newClass.name)).set(newClass);
  },
  removeClassFromFB: function(name){
    var email = formatEmailForFirebase(ref.getAuth().password.email);
    ref.child('classes').child(email).child(prepFBEndpoint(name)).remove();
  }
};

module.exports = fbHelpers;