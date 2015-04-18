var React = require('react');
var fbHelpers = require('../../../utils/firebase/fbHelpers');
var AddNewStudent = require('./AddNewStudent');
var StudentItem = require('./StudentItem');
var settingsActions = require('../../../actions/settingsActions');
var classesStore = require('../../../stores/classesStore');

class Settings extends React.Component{
  constructor(){
    this.state = {
      students: classesStore.getStudents(),
      classes: classesStore.getClasses()
    }
  }
  updateStudents(students){
    this.setState({students});
  }
  removeStudent(index, email){
    settingsActions.removeStudent(index);
    fbHelpers.removeStudent(this.context.router.getCurrentParams().class, email);
  }
  componentDidMount(){
    settingsActions.getStudents();
    classesStore.addChangeListener(this._onChange.bind(this));
    fbHelpers.getStudents(this.context.router.getCurrentParams().class, this.updateStudents.bind(this));
  }
  componentWillUnmount(){
    classesStore.removeChangeListener(this._onChange.bind(this));
  }
  deleteClass(className){
    var classIndex = this.state.classes.filter((item) => item.name === className)
    settingsActions.removeClass(className, classIndex, () =>{
      this.context.router.transitionTo('dashboard');
    })
  }
  _onChange(){
    this.setState({
      students: classesStore.getStudents(),
      classes: classesStore.getClasses()
    });
  }
  render(){
    var currentClass = this.context.router.getCurrentParams().class;
    var students = this.state.students.map((item, index) => {
      return (
        <StudentItem
          email={item.email}
          name={item.name}
          index={index}
          remove={this.removeStudent.bind(this)}
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
          <button className="btn btn-default" onClick={this.deleteClass.bind(this, currentClass)}>Delete Class</button>
        </div>
      </div>
    )
  }
};

Settings.contextTypes = {
  router: React.PropTypes.func.isRequired
}

module.exports = Settings