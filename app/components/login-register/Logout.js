var React = require('react');
var authActions = require('../../actions/authActions');

var Logout = React.createClass({
  componentDidMount: function () {
    authActions.logout();
  },
  render: function () {
    return <p>You are now logged out</p>;
  }
});

module.exports = Logout;