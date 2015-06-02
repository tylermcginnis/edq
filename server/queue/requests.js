import Firebase from 'firebase';
var ref = new Firebase('https://edq.firebaseio.com/');

var queueRequests = {
  init(req, res){
    var userId = req.query.userId;
    var classId = req.query.classId;
    var queuePromise = new Promise((resolve, reject) => {
      ref.child(`queue/${classId}`).on('value', (snapshot) => {
        var data = snapshot.val();
        var arr = [];
        //Update once I have schema set up for this
        for(var key in data){
          arr.push({key: key, data: data[key]});
        }
        resolve(arr);
      });
    });

    var statusPromise = new Promise((resolve, reject) => {
      ref.child(`studentStatus/${classId}`).on('value', (snapshot) => {
        var data = snapshot.val();
        var avg = 0;
        for(var key in data){
          avg += data[key]
        }
        avg = avg / Object.keys(data).length;
        resolve(avg);
      });
    });

    Promise.all([queuePromise, statusPromise])
      .then((data) => {
        res.status(200).json({
          queueData: data[0],
          statusData: data[1]
        });
      })
      .catch((reason) => {
        res.status(400).json(reason);
      });
  }
};

export { queueRequests }