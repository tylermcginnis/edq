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
          user={item}
          index={index}
          remove={this.removeStudent.bind(this)}
          key={index} />
      )
    });
    students = students.length === 0 ? 'No Students' : students;
    return (
      <div className="col-sm-12">
        <h1 className="text-center">{currentClass}</h1>
        <div className="col-sm-6 col-sm-offset-3">
          <AddNewUser addUser={this.addUser.bind(this)}/>
        </div>
        <div className="col-sm-6">
          <h3> Configuration </h3>
                    <h3> Students </h3>
          {students}
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