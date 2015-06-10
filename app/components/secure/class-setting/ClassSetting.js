var React = require('react');
var classHelpers = require('../../../utils/firebase/classHelpers');
var AddNewUser = require('./AddNewUser');
var StudentItem = require('./StudentItem');
var Rebase = require('../../../utils/firebase/rebase');
var appConstants = require('../../../constants/appConstants');
var helpers = require("../../../utils/firebase/helpers");
var Card = require('../../card/Card');

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
    var styles = {
      container: {
        borderTop: `3px solid ${appConstants.blue}`,
        padding: 20,
        background: '#f8f8f8'
      }
    }
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
      return (
        <Card size={12} color={appConstants.blue} key={index}>
          <StudentItem user={item} remove={this.removeUser.bind(this, item.key, item.userType)}/>
        </Card>
      );
    });
    var mentors = mentorArr.map((item, index) => {
      return (
        <Card size={12} color={appConstants.purple} key={index}>
          <StudentItem user={item} remove={this.removeUser.bind(this, item.key, item.userType)} />
        </Card>
      );
    });
    var teachers = teacherArr.map((item, index) => {
      return (
        <Card size={12} color={appConstants.green} key={index}>
          <StudentItem user={item} remove={this.removeUser.bind(this, item.key, item.userType)} />
        </Card>
      );
    });
    return (
      <div className="col-sm-12">
        <h1 className="text-center">{currentClass}</h1>
        <div className="col-sm-6 col-sm-offset-3" style={styles.container}>
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