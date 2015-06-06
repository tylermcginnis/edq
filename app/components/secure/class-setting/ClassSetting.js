var React = require('react');
var classHelpers = require('../../../utils/firebase/classHelpers');
var AddNewUser = require('./AddNewUser');
var StudentItem = require('./StudentItem');
var Rebase = require('../../../utils/firebase/rebase');
var appConstants = require('../../../constants/appConstants');
var helpers = require("../../../utils/firebase/helpers");

var base = Rebase.createClass(appConstants.FIREBASE_URL);

class ClassSetting extends React.Component{
  constructor(){
    this.state = {
      members: []
    };
  }
  removeUser(key, userType){
    classHelpers.removeUser(key, this.props.query.classId, userType);
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
    base.removeBinding(`classes/${this.props.query.classId}`);
  }
  deleteClass(){
    var userId = helpers.getCurrentUserId();
    classHelpers.removeClass(userId, this.props.query.classId, () => {
      this.context.router.transitionTo('dashboard');
    });
  }
  render(){
    var currentClass = this.context.router.getCurrentParams().class;
    var studentArr = [];
    var mentorArr = [];
    var teacherArr = [];

    if(this.state.members){
      studentArr = helpers.toArray(this.state.members.students);
      mentorArr = helpers.toArray(this.state.members.mentors);
      teacherArr = helpers.toArray(this.state.members.teachers);
    }

    var students = studentArr.map((item, index) => {
      return <StudentItem user={item} remove={this.removeUser.bind(this, item.key, item.userType)} key={index} />
    });
    var mentors = mentorArr.map((item, index) => {
      return <StudentItem user={item} remove={this.removeUser.bind(this, item.key, item.userType)} key={index} />
    });
    var teachers = teacherArr.map((item, index) => {
      return <StudentItem user={item} remove={this.removeUser.bind(this, item.key, item.userType)} key={index} />
    });
    return (
      <div className="col-sm-12">
        <h1 className="text-center">{currentClass}</h1>
        <div className="col-sm-6 col-sm-offset-3">
          <AddNewUser addUser={this.addUser.bind(this)}/>
        </div>
        <div className="col-sm-12">
          <div className="col-sm-4">
            <h2 className="text-center">Students</h2>
            {students.length === 0 ? 'No Students' : students}
          </div>
          <div className="col-sm-4">
            <h2 className="text-center">Mentors</h2>
            {mentors.length === 0 ? 'No Mentors' : mentors}
          </div>
          <div className="col-sm-4">
            <h2 className="text-center">Teachers</h2>
            {teachers.length === 0 ? 'No Teachers' : teachers}
          </div>
        </div>
        <button className="btn btn-default" onClick={this.deleteClass.bind(this, currentClass)}>Delete Class</button>
      </div>
    )
  }
};

ClassSetting.contextTypes = {
  router: React.PropTypes.func.isRequired
};

module.exports = ClassSetting;