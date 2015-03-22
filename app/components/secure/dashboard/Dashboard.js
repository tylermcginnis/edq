var React = require('react');
var Router = require('react-router');
var Class = require('./Class');
var Authenticated = require('../../../utils/authenticated');
var dashboardStore = require('../../../stores/dashboardStore');
var dashboardActions = require('../../../actions/dashboardActions');

var Dashboard = React.createClass({
  mixins: [Authenticated],
  getInitialState(){
    return {
      classes: dashboardStore.getClasses()
    };
  },
  componentDidMount(){
    dashboardStore.addChangeListener(this._onChange);
  },
  componentWillUnmount(){
    dashboardStore.removeChangeListener(this._onChange)
  },
  handleSubmit(e){
    e.preventDefault();
    var newClass = this.refs.newClass.getDOMNode().value;
    this.refs.newClass.getDOMNode().value = ''
    dashboardActions.addClass({name: newClass});
  },
  removeClass(name, index){
    dashboardActions.removeClass(name, index);
  },
  _onChange(){
    this.setState({
      classes: dashboardStore.getClasses()
    });
  },
  render(){
    var list = this.state.classes.map((item, index) => {
      return (
        <Class info={item} index={index} key={index} removeClass={this.removeClass.bind(null, item.name, index)}/>
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