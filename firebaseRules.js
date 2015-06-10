{
    "rules": {
      "users": {
        "$user_id": {
          ".write": "$user_id === auth.uid"
         }
      },
      "classes": {
        "$classId": {
           ".write": "root.child('users').child('auth.uid').child('classes').child('$classId').child('isTeacher').val() === true",
           ".read": "root.child('users').child('auth.uid').child('classes').child('$classId').child('isTeacher').val() === true"
        }
      },
      "studentStatus": {
        "$userId": {
          ".write": "$userId === auth.uid",
          ".read": true
        }
      },
      "queue": {
        "$classId": {
            ".write": "root.child('users').child('auth.uid').child('classes').child('$classId').child('isStudent').val() === true",
            ".read": "root.child('users').child('auth.uid').child('classes').child('$classId').child('isMentor').val() === true || root.child('users').child('$user_id').child('classes').child('$classId').child('isStudent').val() === true || root.child('users').child('$user_id').child('classes').child('$classId').child('isTeacher').val() === true"
        }
      }
    }
}