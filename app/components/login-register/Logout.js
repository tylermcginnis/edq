var React = require('react');
var auth = require('../../utils/firebase/auth');

var Logout = React.createClass({
  componentDidMount(){
    auth.logout();
  },
  render(){
    return <p>You are now logged out</p>;
  }
});

module.exports = Logout;