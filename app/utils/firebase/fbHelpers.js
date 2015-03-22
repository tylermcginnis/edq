var ref = require('../../constants/fbref');

function formatEmailForFirebase(email){
  var key = email.replace('@', '^');
  if(key.indexOf('.') !== -1){
    return key.split('.').join('*');
  }
  return key;
};

function prepFBEndpoint(endpoint){
  var hash = {
    ".": true, "#": true, "$": true, "[": true, "]": true
  };

  endpoint = endpoint.split('');
  var result = endpoint.map((item) => {
    if(hash[item]){
      return ""
    }
    return item.toLowerCase();
  });
  return result.join('');
};

var fbHelpers = {
  addNewUserToFB(newUser){
    var key = formatEmailForFirebase(newUser.email);
    ref.child('user').child(key).set(newUser);
  },
  addNewClassToFB(newClass){
    var email = formatEmailForFirebase(ref.getAuth().password.email);
    ref.child('classes').child(email).child(prepFBEndpoint(newClass.name)).set(newClass);
  },
  removeClassFromFB(name){
    var email = formatEmailForFirebase(ref.getAuth().password.email);
    ref.child('classes').child(email).child(prepFBEndpoint(name)).remove();
  }
};

module.exports = fbHelpers;