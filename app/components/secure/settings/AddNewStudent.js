var React = require('react');
var classHelpers = require('../../../utils/firebase/classHelpers');

class AddNewStudent extends React.Component{
  handleSubmit(e){
    e.preventDefault();
    var firstName = this.refs.firstName.getDOMNode().value;
    var lastName = this.refs.lastName.getDOMNode().value;
    var email = this.refs.email.getDOMNode().value;
    this.refs.firstName.getDOMNode().value = ''
    this.refs.lastName.getDOMNode().value = ''
    this.refs.email.getDOMNode().value = ''
    this.props.addStudent(firstName, lastName, email);
  }
  render(){
    return (
      <div className="col-sm-12">
        <form>
          <div className="form-group">
            <label>Student First Name</label>
            <input type="text" ref="firstName" className="form-control" placeholder="New Student First Name" />
          </div>
          <div className="form-group">
            <label>Student Last Name</label>
            <input type="text" ref="lastName" className="form-control" placeholder="New Student Last Name" />
          </div>
          <div className="form-group">
            <label>Student Email</label>
            <input type="text" ref="email" className="form-control" placeholder="Student Email" />
          </div>
          <button type="submit" className="btn btn-default" onClick={this.handleSubmit.bind(this)}>Add New Student</button>
        </form>
      </div>
    )
  }
};

module.exports = AddNewStudent;