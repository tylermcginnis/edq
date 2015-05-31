var helpers = {
  prepFbKey(endpoint){
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
  },
  prepClassId(className, email){
    return `${className}-${email}`
  },
  toArray(obj){
    var arr = [];
    for(var key in obj){
      arr.push(obj[key]);
    }
    return arr;
  }
};

/*
  formatEmailForFirebase(email){
    var key = email.replace('@', '^');
    if(key.indexOf('.') !== -1){
      return key.split('.').join('*');
    }
    return key;
  },
*/

module.exports = helpers;