var React = require('react');
var Router = require('react-router');
var auth = require('../../utils/firebase/auth');

class Register extends React.Component{
  handleSubmit(e){
    e.preventDefault();
    var { router } = this.context;
    var authObj = {
      email: this.refs.email.getDOMNode().value,
      password: this.refs.pw.getDOMNode().value,
      firstName: this.refs.firstName.getDOMNode().value,
      lastName: this.refs.lastName.getDOMNode().value
    }
    auth.createUser(authObj, (err, data) => {
      if(err){
        console.log('Error on Create User');
      } else if(data){
        console.log("Data is ", data);
        router.replaceWith('dashboard');
      };
    });
  }
  render(){
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <form onSubmit={this.handleSubmit.bind(this)}>
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
          <button type="submit" className="btn btn-primary">Register</button>
        </form>
      </div>
    )
  }
};

Register.contextTypes = {
  router: React.PropTypes.func.isRequired
}

module.exports = Register;