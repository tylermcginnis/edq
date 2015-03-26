var React = require('react');
var firebaseUtils = require('../../../utils/firebase/firebaseUtils');
var AddNewStudent = require('./AddNewStudent');
var StudentItem = require('./StudentItem');

class Settings extends React.Component{
  constructor(){
    this.state = {
      students: []
    }
    this.updateStudents = this.updateStudents.bind(this);
    this.deleteClass = this.deleteClass.bind(this);
    this.removeStudent = this.removeStudent.bind(this);
  }
  updateStudents(students){
    this.setState({students});
  }
  removeStudent(index, email){
    var newStudents = this.state.students;
    var removedStudent = newStudents.splice(index, 1);
    this.setState({
      students: newStudents
    });
    firebaseUtils.removeStudent(this.context.router.getCurrentParams().class, email);
  }
  componentDidMount(){
    firebaseUtils.getStudents(this.context.router.getCurrentParams().class, this.updateStudents);
  }
  deleteClass(className){
    firebaseUtils.removeClass(className, () =>{
      this.context.router.transitionTo('dashboard');
    });
  }
  render(){
    var currentClass = this.context.router.getCurrentParams().class
    var students = this.state.students.map((item, index) => {
      return (
        <StudentItem
          email={item.email}
          name={item.name}
          index={index}
          remove={this.removeStudent}
          key={index} />
      )
    });
    return (
      <div className="col-sm-12">
        <h1 className="text-center">{currentClass}</h1>
        <div className="col-sm-6">
          <AddNewStudent currentClass={currentClass} />
          <h3> Students </h3>
          {students}
        </div>
        <div className="col-sm-6">
          <h3> Configuration </h3>
          <button className="btn btn-default" onClick={this.deleteClass.bind(null, currentClass)}>Delete Class</button>
        </div>
      </div>
    )
  }
};

Settings.contextTypes = {
  router: React.PropTypes.func.isRequired
}

module.exports = Settings