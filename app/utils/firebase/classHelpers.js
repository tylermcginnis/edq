var ref = require('../../constants/fbref');
var helpers = require('./helpers');

function addClassToUser(rawClassName, email, role){
  var classId = helpers.prepClassId(helpers.prepFBKey(rawClassName), email);
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
  var classId = helpers.prepClassId(className, email);
  ref.child('users').child(email).child('classes').child(classId).remove();
};

var classHelpers = {
  addNewUserToFB(newUser){
    var key = helpers.formatEmailForFirebase(newUser.email);
    ref.child('users').child(key).set(newUser);
  },
  addNewClassToFB(newClass){
    var email = helpers.formatEmailForFirebase(ref.getAuth().password.email);
    var className = helpers.prepFBKey(newClass.name);
    var classId = helpers.prepClassId(className, email)
    ref.child('classes').child(classId).set(newClass);
    addClassToUser(newClass.name, email, 'teacher');
  },
  removeClass(className, cb){
    var email = helpers.formatEmailForFirebase(ref.getAuth().password.email);
    var className = helpers.prepFBKey(className);
    var classId = helpers.prepClassId(className, email);
    var studentsOfClassEndpoint = `classes/${classId}/students`;
    ref.child(studentsOfClassEndpoint).once('value', (snapshot) => {
      var students = snapshot.val();
      for(var student in students){
        ref.child(`users/${student}/classes/${classId}`).remove();
      }
      ref.child(`classes/${classId}`).remove();
      removeClassFromUser(className, email);
      cb && cb();
    });
  },
  getClasses(cb){
    var email = helpers.formatEmailForFirebase(ref.getAuth().password.email);
    ref.child('users').child(email).child('classes').on('value', (snapshot) => {
      var classes = snapshot.val();
      if(!classes){
        cb([]);
      } else {
        cb(helpers.toArray(classes));
      }
    })
  },
  getStudents(className, cb){
    var email = helpers.formatEmailForFirebase(ref.getAuth().password.email);
    var formatedClass = helpers.prepFBKey(className);
    var classId = helpers.prepClassId(formatedClass, email);
    ref.child(`classes/${classId}/students`).on('value', (snapshot) => {
      var data = snapshot.val();
      data ? cb(helpers.toArray(data)) : cb([]);
    });
  },
  addStudent(className, studentObj){
    var classId = helpers.prepClassId(helpers.prepFBKey(className), helpers.formatEmailForFirebase(ref.getAuth().password.email));
    ref.child(`classes/${classId}/students/${helpers.formatEmailForFirebase(studentObj.email)}`).set(studentObj);
    ref.child(`users/${helpers.formatEmailForFirebase(studentObj.email)}/classes/${classId}`)
      .set({
        name: className,
        isTeacher: false,
        isMentor: false,
        isStudent: true
      })
  },
  removeStudent(className, studentEmail){
    var classId = helpers.prepClassId(helpers.prepFBKey(className), helpers.formatEmailForFirebase(ref.getAuth().password.email));
    ref.child(`classes/${classId}/students/${helpers.formatEmailForFirebase(studentEmail)}`).remove();
    ref.child(`users/${helpers.formatEmailForFirebase(studentEmail)}/classes/${classId}`).remove();
  }
};

module.exports = classHelpers;