var React = require('react');
var helperFns = require('../../../utils/firebase/helperFns');

class AddNewStudent extends React.Component{
  handleSubmit(e){
    e.preventDefault();
    var name = this.refs.name.getDOMNode().value;
    var email = this.refs.email.getDOMNode().value;
    this.refs.name.getDOMNode().value = ''
    this.refs.email.getDOMNode().value = ''
    helperFns.addStudent(this.props.currentClass, {name, email});
  }
  render(){
    return (
      <div className="col-sm-12">
        <form>
          <div className="form-group">
            <label>Student Name</label>
            <input type="text" ref="name" className="form-control" placeholder="New Student Name" />
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