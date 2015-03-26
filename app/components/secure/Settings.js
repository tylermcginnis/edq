var React = require('react');
var firebaseUtils = require('../../utils/firebase/firebaseUtils');

class Settings extends React.Component{
  constructor(){
    this.state = {
      students: []
    }
    this.updateStudents = this.updateStudents.bind(this);
    this.deleteClass = this.deleteClass.bind(this);
  }
  updateStudents(students){
    this.setState({students});
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
    {/*map over students creating an array of students componentts*/}
    return (
      <div className="col-sm-12">
        <h1 className="text-center">{currentClass}</h1>
        <div className="col-sm-6">
          <h2> Students </h2>
        </div>
        <div className="col-sm-6">
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