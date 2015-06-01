var React = require('react');
var classHelpers = require('../../../utils/firebase/classHelpers');
var AddNewStudent = require('./AddNewStudent');
var StudentItem = require('./StudentItem');
var settingsActions = require('../../../actions/settingsActions');
var classesStore = require('../../../stores/classesStore');
var userStore = require('../../../stores/userStore');
var isMounted = require('../../../utils/isMounted');

class Settings extends React.Component{
  constructor(){
    this.state = {
      members: classesStore.getMembers()
    };
  }
  removeStudent(index){
    var userId = userStore.getUser().pushId;
    var className = this.context.router.getCurrentParams().class;
    var email = this.state.members[index].email;
    settingsActions.removeStudent(index, userId, className, email);
  }
  addStudent(firstName, lastName, email){
    var className = this.context.router.getCurrentParams().class;
    var userId = userStore.getUser().pushId;
    settingsActions.addStudent({firstName, lastName, email, className, userId});
  }
  componentDidMount(){
    classesStore.addChangeListener(this._onChange.bind(this));
    var userId = userStore.getUser().pushId;
    settingsActions.getStudents(userId, this.context.router.getCurrentParams().class);
  }
  componentWillUnmount(){
    classesStore.removeChangeListener(this._onChange.bind(this));
  }
  deleteClass(className){
    var userId = userStore.getUser().pushId;
    settingsActions.removeClass(userId, className, () => {
      this.context.router.transitionTo('dashboard');
    });
  }
  _onChange(){
    if(isMounted(Settings)){
      this.setState({
        members: classesStore.getMembers()
      });
    }
  }
  render(){
    var currentClass = this.context.router.getCurrentParams().class;
    var students = this.state.members.map((item, index) => {
      return (
        <StudentItem
          email={item.email}
          firstName={item.firstName}
          lastName={item.lastName}
          index={index}
          remove={this.removeStudent.bind(this)}
          key={index} />
      )
    });
    students = students.length === 0 ? 'No Students' : students;
    return (
      <div className="col-sm-12">
        <h1 className="text-center">{currentClass}</h1>
        <div className="col-sm-6">
          <AddNewStudent addStudent={this.addStudent.bind(this)}/>
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