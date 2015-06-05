var ref = require('../../constants/fbref');
var helpers = require('./helpers');

function addClassToUser(userId, newClassName, role, classId){
  var classObj = {
    isTeacher: false,
    isMentor: false,
    isStudent: false,
    name: newClassName
  };
  role === 'teacher'  && (classObj.isTeacher = true);
  role === 'mentor' && (classObj.isMentor = true);
  role === 'student'  && (classObj.isStudent = true);
  ref.child(`users/${userId}/classes/${classId}`).set(classObj);
};

function removeClassFromUser(userId, classId){
  ref.child(`users/${userId}/classes/${classId}`).remove();
};

var classHelpers = {
  addNewClassToFB(userId, newClassName){
    var newClassRef = ref.child('classes').push({name: newClassName});
    addClassToUser(userId, newClassName, 'teacher', newClassRef.key());
  },
  removeClass(userId, className, cb){
    helpers.getClassId(userId, className, (classId) => {
      ref.child(`classes/${classId}/students`).once('value', (snapshot) => {
        var students = snapshot.val();
        for(var studentId in students){
          ref.child(`users/${studentId}/classes/${classId}`).remove();
        }
        ref.child(`classes/${classId}`).remove();
        removeClassFromUser(userId, classId);
        cb();
      });
    });
  },
  getClasses(userId, cb){
    ref.child(`users/${userId}/classes`).on('value', (snapshot) => {
      var classes = snapshot.val();
      if(!classes){
        cb([]);
      } else {
        cb(helpers.toArray(classes));
      }
    });
  },
  getStudents(userId, className, cb){
    helpers.getClassId(userId, className, (classId) => {
      ref.child(`classes/${classId}/students`).on('value', (snapshot) => {
        var data = snapshot.val();
        data ? cb(helpers.toArray(data)) : cb([]);
      });
    });
  },
  addStudent(user, className, classId){
    var newUserRef = ref.child('users').push({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userType: user.userType
    });

    newUserRef.child(`classes/${classId}`).set({
      name: className,
      isTeacher: user.userType === 'teacher' ? true : false,
      isMentor: user.userType === 'mentor' ? true : false,
      isStudent: user.userType === 'student' ? true : false,
    });

    ref.child(`classes/${classId}/${user.userType}s/${newUserRef.key()}`).set(user);
  },
  removeStudent(email, classId){
    helpers.getStudentId(email, classId, (studentId) => {
      ref.child(`classes/${classId}/students/${studentId}`).remove();
      ref.child(`users/${studentId}/classes/${classId}`).remove();
    })
  }
};

module.exports = classHelpers;