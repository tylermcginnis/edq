var ref = require('../../constants/fbref');

function formatEmailForFirebase(email){
  var key = email.replace('@', '^');
  if(key.indexOf('.') !== -1){
    return key.split('.').join('*');
  }
  return key;
};

function prepFBKey(endpoint){
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

function prepClassId(className, email){
  return className + '-' + email;
}

var fbHelpers = {
  addNewUserToFB(newUser){
    var key = formatEmailForFirebase(newUser.email);
    ref.child('user').child(key).set(newUser);
  },
  addNewClassToFB(newClass){
    var email = formatEmailForFirebase(ref.getAuth().password.email);
    var className = prepFBKey(newClass.name);
    ref.child('classes').child(prepClassId(className, email)).set(newClass);
  },
  removeClassFromFB(name){
    var email = formatEmailForFirebase(ref.getAuth().password.email);
    var name = prepFBKey(name);
    ref.child('classes').child(prepClassId(name, email)).remove();
  }
};

module.exports = fbHelpers;