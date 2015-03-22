var React = require('react');
var authActions = require('../../actions/authActions');

var Logout = React.createClass({
  componentDidMount(){
    authActions.logout();
  },
  render(){
    return <p>You are now logged out</p>;
  }
});

module.exports = Logout;