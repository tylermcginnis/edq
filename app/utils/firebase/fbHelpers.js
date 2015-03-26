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

function addClassToUser(rawClassName, email, role){
  var classId = prepClassId(prepFBKey(rawClassName), email);
  var classObj = {
    isTeacher: false,
    isMentor: false,
    isStudent: false,
    name: rawClassName
  };
  role === 'teacher'  && (classObj.isTeacher = true);
  role === 'mentor' && (classObj.isMentor = true);
  role === 'student'  && (classObj.isStudent = true);
  ref.child('users').child(email).child('classes').child(classId).set(classObj);
};

function removeClassFromUser(className, email){
  var classId = prepClassId(className, email);
  ref.child('users').child(email).child('classes').child(classId).remove();
};

function toArray(obj){
  var arr = [];
  for(var key in obj){
    arr.push(obj[key]);
  }
  return arr;
};

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
    addClassToUser(newClass.name, email, 'teacher');
  },
  removeClassFromFB(name){
    var email = formatEmailForFirebase(ref.getAuth().password.email);
    var name = prepFBKey(name);
    ref.child('classes').child(prepClassId(name, email)).remove();
    removeClassFromUser(name, email);
  },
  getClasses(cb){
    var email = formatEmailForFirebase(ref.getAuth().password.email);
    ref.child('users').child(email).child('classes').on('value', (snapshot) => {
      var classes = snapshot.val();
      if(!classes){
        cb([]);
      } else {
        cb(toArray(classes));
      }
    })
  }
};

module.exports = fbHelpers;