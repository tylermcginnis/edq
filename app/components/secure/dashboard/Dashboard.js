var React = require('react');
var Router = require('react-router');
var ClassBadge = require('./ClassBadge');
var requireAuth = require('../../../utils/authenticated');
var dashboardStore = require('../../../stores/dashboardStore');
var dashboardActions = require('../../../actions/dashboardActions');

var Dashboard = requireAuth(class extends React.Component{
  constructor(){
    this.state = {
      classes: dashboardStore.getClasses()
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this._onChange = this._onChange.bind(this);
  }
  componentDidMount(){
    dashboardStore.addChangeListener(this._onChange);
    // dashboardActions.getInitialClasses();
  }
  componentWillUnmount(){
    dashboardStore.removeChangeListener(this._onChange)
  }
  handleSubmit(e){
    e.preventDefault();
    var newClass = this.refs.newClass.getDOMNode().value;
    this.refs.newClass.getDOMNode().value = ''
    dashboardActions.addClass({name: newClass});
  }
  removeClass(name, index){
    dashboardActions.removeClass(name, index);
  }
  _onChange(){
    this.setState({
      classes: dashboardStore.getClasses()
    });
  }
  render(){
    var list = this.state.classes.map((item, index) => {
      return (
        <ClassBadge info={item} index={index} key={index} removeClass={this.removeClass.bind(null, item.name, index)}/>
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
            <button type="submit" className="btn btn-default" onClick={this.handleSubmit}>Submit</button>
          </form>
        </div>
        {list}
      </span>
    )
  }
});

module.exports = Dashboard;