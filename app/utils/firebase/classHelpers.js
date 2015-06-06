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

function getUserIdWithEmail(email, cb){
  ref.child('users').once('value', (snapshot) => {
    var data = snapshot.val();
    var id = -1;
    for(var key in data){
      if(data[key].email.toLowerCase() === email.toLowerCase()){
        id = key;
        break;
      }
    }
    console.log('ccc', id);
    cb(id);
  });
};

var classHelpers = {
  addNewClassToFB(userId, newClassName){
    var newClassRef = ref.child('classes').push({name: newClassName});
    addClassToUser(userId, newClassName, 'teacher', newClassRef.key());
  },
  removeClass(userId, classId, cb){
    ref.child(`classes/${classId}/students`).once('value', (snapshot) => {
      var students = snapshot.val();
      for(var studentId in students){
        ref.child(`users/${studentId}/classes/${classId}`).remove();
      }
      ref.child(`classes/${classId}`).remove();
      removeClassFromUser(userId, classId);
      cb();
    });
  },
  addStudent(user, className, classId){
    var classData = {
      name: className,
      isTeacher: user.userType === 'teacher' ? true : false,
      isMentor: user.userType === 'mentor' ? true : false,
      isStudent: user.userType === 'student' ? true : false,
    };
    getUserIdWithEmail(user.email, (userId) => {
      debugger;
      if(userId === -1){
        var newUserRef = ref.child('users').push({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        });
        userId = newUserRef.key();
        newUserRef.child(`classes/${classId}`).set(classData);
      } else {
        ref.child(`users/${userId}/classes/${classId}`).set(classData);
      }
      ref.child(`classes/${classId}/${user.userType}s/${userId}`).set(user);
    });
  },
  removeUser(userId, classId, userType){
    ref.child(`classes/${classId}/${userType}s/${userId}`).remove();
    ref.child(`users/${userId}/classes/${classId}`).remove();
  }
};

module.exports = classHelpers;