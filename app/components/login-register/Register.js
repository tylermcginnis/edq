var React = require('react');
var Router = require('react-router');
var authActions = require('../../actions/authActions');

var Register = React.createClass({
  mixins: [ Router.Navigation ],
  handleSubmit: function(e){
    e.preventDefault();
    var authObj = {
      email: this.refs.email.getDOMNode().value,
      password: this.refs.pw.getDOMNode().value,
      firstName: this.refs.firstName.getDOMNode().value,
      lastName: this.refs.lastName.getDOMNode().value
    }
    authActions.registerUser(authObj, function(result){
      if(result){
        this.replaceWith('dashboard');
      }
    }.bind(this))
  },
  render: function(){
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label> First Name </label>
            <input className="form-control" ref="firstName" placeholder="First Name"/>
          </div>
          <div className="form-group">
            <label> Last Name </label>
            <input className="form-control" ref="lastName" placeholder="Last Name"/>
          </div>
          <div className="form-group">
            <label> Email </label>
            <input className="form-control" ref="email" placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input ref="pw" type="password" className="form-control" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    )
  }
});

module.exports = Register;