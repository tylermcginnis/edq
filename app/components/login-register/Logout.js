var React = require('react');
var auth = require('../../utils/firebase/auth');

var Logout = React.createClass({
  componentDidMount(){
    auth.logout(() => {
      this.context.router.replaceWith('dashboard');
    });
  },
  render(){
    return <p>You are now logged out</p>;
  }
});

Logout.contextTypes = {
  router: React.PropTypes.func.isRequired
};

module.exports = Logout;