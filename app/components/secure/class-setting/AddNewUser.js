var React = require('react');
var classHelpers = require('../../../utils/firebase/classHelpers');

class AddNewUser extends React.Component{
  handleSubmit(e){
    e.preventDefault();
    var firstName = this.refs.firstName.getDOMNode().value;
    var lastName = this.refs.lastName.getDOMNode().value;
    var email = this.refs.email.getDOMNode().value;
    var userType = this.refs.userType.getDOMNode().value;
    this.refs.firstName.getDOMNode().value = ''
    this.refs.lastName.getDOMNode().value = ''
    this.refs.email.getDOMNode().value = ''
    this.refs.userType.getDOMNode().value = ''
    this.props.addUser({firstName, lastName, email, userType});
  }
  render(){
    return (
      <div className="col-xs-12">
        <form>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" ref="firstName" className="form-control" placeholder="New User First Name" />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" ref="lastName" className="form-control" placeholder="New User Last Name" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="text" ref="email" className="form-control" placeholder="New User Email" />
          </div>
          <div className="form-group">
            <label>User Type</label>
             <select ref="userType" className="form-control">
              <option value="student">Student</option>
              <option value="mentor">Mentor</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <button type="submit" className="btn btn-default" onClick={this.handleSubmit.bind(this)}>Add User</button>
        </form>
      </div>
    )
  }
};

module.exports = AddNewUser;