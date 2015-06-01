var ref = require('../../constants/fbref');
var helpers = require('./helpers');

function addClassToUser(userId, newClassName, role, classId){
  /*Finished Refactor*/
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
  /*Finished Refactor*/
  ref.child(`users/${userId}/classes/${classId}`).remove();
};

function getClassId(teacherId, className, cb){
  /*Finished Refactor*/
  ref.child(`users/${teacherId}/classes`).once('value', (snapshot) => {
    var classes = snapshot.val();
    for(var key in classes){
      if(classes[key].name === className && classes[key].isTeacher === true){
        cb(key);
      }
    }
  });
};

function getStudentId(email, classId, cb){
  ref.child(`classes/${classId}/students`).once('value', (snapshot) => {
    var data = snapshot.val();
    for(var key in data){
      if(data[key].email === email){
        console.log('THE KEY WAS', key);
        cb(key);
      }
    }
  });
}

var classHelpers = {
  addNewClassToFB(userId, newClassName){
    /*Finished Refactor*/
    var newClassRef = ref.child('classes').push({name: newClassName});
    addClassToUser(userId, newClassName, 'teacher', newClassRef.key());
  },
  removeClass(userId, className, cb){
    /*Finished Refactor*/
    getClassId(userId, className, (classId) => {
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
    /*Finished Refactor*/
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
    getClassId(userId, className, (classId) => {
      //change students to mentors?
      ref.child(`classes/${classId}/students`).on('value', (snapshot) => {
        var data = snapshot.val();
        data ? cb(helpers.toArray(data)) : cb([]);
      });
    });
  },
  addStudent(obj){
    getClassId(obj.userId, obj.className, (classId) => {
      var newUserRef = ref.child('users').push({
        firstName: obj.firstName,
        lastName: obj.lastName,
        email: obj.email
      });

      newUserRef.child(`classes/${classId}`).set({
        name: obj.className,
        isTeacher: false,
        isMentor: false,
        isStudent: true
      });

      ref.child(`classes/${classId}/students/${newUserRef.key()}`).set({
        firstName: obj.firstName,
        lastName: obj.lastName,
        email: obj.email
      });
    });
  },
  removeStudent(userId, className, email){
    getClassId(userId, className, (classId) => {
      getStudentId(email, classId, (studentId) => {
        ref.child(`classes/${classId}/students/${studentId}`).remove();
        ref.child(`users/${studentId}/classes/${classId}`).remove();
      })
    });
  }
};

module.exports = classHelpers;