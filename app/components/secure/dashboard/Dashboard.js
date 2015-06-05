var React = require('react');
var ClassBadge = require('./ClassBadge');
var requireAuth = require('../../../utils/authenticated');
var Rebase = require('../../../utils/firebase/rebase');
var appConstants = require('../../../constants/appConstants');
var classHelpers = require('../../../utils/firebase/classHelpers');

var base = Rebase.createClass(appConstants.FIREBASE_URL);

var Dashboard = requireAuth(class extends React.Component{
  constructor(){
    this.state = {
      classes: [],
      user: JSON.parse(localStorage.getItem('user'))
    }
  }
  componentDidMount(){
    base.bindToState(`users/${this.state.user.pushId}/classes`, {
      context: this,
      asArray: true,
      state: 'classes'
    });
  }
  componentWillUnmount(){
    base.removeBinding(`users/${this.state.user.pushId}/classes`);
  }
  handleSubmit(e){
    e.preventDefault();
    var newClassName = this.refs.newClass.getDOMNode().value;
    this.refs.newClass.getDOMNode().value = '';
    classHelpers.addNewClassToFB(this.state.user.pushId, newClassName);
  }
  render(){
    var list = this.state.classes.map((item, index) => {
      return (
        <ClassBadge info={item} index={index} key={index} />
      )
    });
    return (
      <span>
        <div className="col-sm-4 card">
          <form>
            <div className="form-group">
              <label>Class Name</label>
              <input type="text" ref="newClass" className="form-control" placeholder="Class Name" />
            </div>
            <button type="submit" className="btn btn-default" onClick={this.handleSubmit.bind(this)}>Submit</button>
          </form>
        </div>
        {list}
      </span>
    )
  }
});

module.exports = Dashboard;