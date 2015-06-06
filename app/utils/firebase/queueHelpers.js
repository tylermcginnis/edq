var ref = require('../../constants/fbref');
var axios = require('axios');
var helpers = require('./helpers');

//not being used
var queueHelpers = {
  // init(userId, className, cb){
  //   helpers.getClassId(userId, className, (classId) => {
  //     axios.get('http://localhost:4001/api/initQueue', {
  //       params: {userId, classId}
  //     }).then((res) => {
  //       cb(res.data);
  //     })
  //   });
  // }
};

module.exports = queueHelpers;