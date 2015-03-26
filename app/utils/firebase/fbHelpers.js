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
  role === 'teacher'  && (roles.isTeacher = true);
  role === 'mentor' && (roles.isMentor = true);
  role === 'student'  && (roles.isStudent = true);
  ref.child('users').child(email).child('classes').child(classId).set(roles);
};

function removeClassFromUser(className, email){
  var classId = prepClassId(className, email);
  ref.child('users').child(email).child('classes').child(classId).remove();
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
    removeClassFromUser(name, email);
  }
};

module.exports = fbHelpers;