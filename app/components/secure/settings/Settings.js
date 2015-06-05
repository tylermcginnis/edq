var React = require('react');
var classHelpers = require('../../../utils/firebase/classHelpers');
var AddNewStudent = require('./AddNewStudent');
var StudentItem = require('./StudentItem');
var Rebase = require('../../../utils/firebase/rebase');
var appConstants = require('../../../constants/appConstants');
var helpers = require("../../../utils/firebase/helpers");

var base = Rebase.createClass(appConstants.FIREBASE_URL);

class Settings extends React.Component{
  constructor(){
    this.state = {
      members: []
    };
  }
  removeStudent(index){
    var userId = helpers.getCurrentUserId();
    var className = this.context.router.getCurrentParams().class;
    var email = this.state.members[index].email;
    classHelpers.removeStudent(email, this.props.query.classId);
  }
  addStudent(firstName, lastName, email){
    var className = this.context.router.getCurrentParams().class;
    classHelpers.addStudent({firstName, lastName, email}, className, this.props.query.classId);
  }
  componentDidMount(){
    var userId = helpers.getCurrentUserId();
    base.bindToState(`classes/${this.props.query.classId}/students`, {
      context: this,
      asArray: true,
      state: 'members'
    });
  }
  componentWillUnmount(){
    var userId = helpers.getCurrentUserId();
    base.removeBinding(`classes/${this.props.query.classId}/students`);
  }
  deleteClass(className){
    var userId = helpers.getCurrentUserId();
    classHelpers.removeClass(userId, this.context.router.getCurrentParams().class, () => {
      this.context.router.transitionTo('dashboard');
    });
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