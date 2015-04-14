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
  removeClassFromFB(className){
    var email = formatEmailForFirebase(ref.getAuth().password.email);
    var className = prepFBKey(className);
    var classId = prepClassId(className, email);
    var studentsOfClassEndpoint = `classes/${classId}/students`;
    ref.child(studentsOfClassEndpoint).once('value', (snapshot) => {
      var students = snapshot.val();
      for(var student in students){
        ref.child(`users/${student}/classes/${classId}`).remove();
      }
      ref.child(`classes/${classId}`).remove();
      removeClassFromUser(className, email);
    });
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
  },
  getStudents(className, cb){
    var email = formatEmailForFirebase(ref.getAuth().password.email);
    var formatedClass = prepFBKey(className);
    var classId = prepClassId(formatedClass, email);
    ref.child(`classes/${classId}/students`).on('value', (snapshot) => {
      var data = snapshot.val();
      data ? cb(toArray(data)) : cb([]);
    });
  },
  addStudent(className, studentObj){
    var classId = prepClassId(prepFBKey(className), formatEmailForFirebase(ref.getAuth().password.email));
    ref.child(`classes/${classId}/students/${formatEmailForFirebase(studentObj.email)}`).set(studentObj);
    ref.child(`users/${formatEmailForFirebase(studentObj.email)}/classes/${classId}`)
      .set({
        name: className,
        isTeacher: false,
        isMentor: false,
        isStudent: true
      })
  },
  removeStudent(className, studentEmail){
    var classId = prepClassId(prepFBKey(className), formatEmailForFirebase(ref.getAuth().password.email));
    ref.child(`classes/${classId}/students/${formatEmailForFirebase(studentEmail)}`).remove();
    ref.child(`users/${formatEmailForFirebase(studentEmail)}/classes/${classId}`).remove();
  }
};

module.exports = fbHelpers;