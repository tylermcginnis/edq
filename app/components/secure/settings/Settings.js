var React = require('react');
var classHelpers = require('../../../utils/firebase/classHelpers');
var AddNewUser = require('./AddNewUser');
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
  addUser(user){
    var className = this.context.router.getCurrentParams().class;
    classHelpers.addStudent(user, className, this.props.query.classId);
  }
  componentDidMount(){
    var userId = helpers.getCurrentUserId();
    base.bindToState(`classes/${this.props.query.classId}`, {
      context: this,
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
    var studentArr = helpers.toArray(this.state.members.students);
    var mentorArr = helpers.toArray(this.state.members.mentors);
    var teacherArr = helpers.toArray(this.state.members.teachers);

    var students = studentArr.map((item, index) => {
      return <StudentItem user={item} index={index} remove={this.removeStudent.bind(this)} key={index} />
    });
    var mentors = mentorArr.map((item, index) => {
      return <StudentItem user={item} index={index} remove={this.removeStudent.bind(this)} key={index} />
    });
    var teachers = teacherArr.map((item, index) => {
      return <StudentItem user={item} index={index} remove={this.removeStudent.bind(this)} key={index} />
    });
    // students = students.length === 0 ? 'No Students' : students;
    return (
      <div className="col-sm-12">
        <h1 className="text-center">{currentClass}</h1>
        <div className="col-sm-6 col-sm-offset-3">
          <AddNewUser addUser={this.addUser.bind(this)}/>
        </div>
        <div className="col-sm-6">
          {students}
          {mentors}
          {teachers}
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