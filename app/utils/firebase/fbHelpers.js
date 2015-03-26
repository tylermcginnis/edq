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

function addClassToUser(className, email, role){
  var classId = prepClassId(className, email);
  var roles = {
    isTeacher: false,
    isMentor: false,
    isStudent: false
  };
  switch (role){
    case 'teacher' :
      roles.isTeacher = true;
      break;
    case 'mentor' :
      roles.isMentor = true;
      break;
    case 'student' :
      roles.isStudent = true;
      break;
    default :
      return;
  }
  ref.child('users').child(email).child('classes').child(classId).set(roles)
}

var fbHelpers = {
  addNewUserToFB(newUser){
    var key = formatEmailForFirebase(newUser.email);
    ref.child('users').child(key).set(newUser);
  },
  addNewClassToFB(newClass){
    var email = formatEmailForFirebase(ref.getAuth().password.email);
    var className = prepFBKey(newClass.name);
    var classId = prepClassId(className, email)
    ref.child('classes').child(classId).set(newClass);
    addClassToUser(className, email, 'teacher');
  },
  removeClassFromFB(name){
    var email = formatEmailForFirebase(ref.getAuth().password.email);
    var name = prepFBKey(name);
    ref.child('classes').child(prepClassId(name, email)).remove();
  }
};

module.exports = fbHelpers;