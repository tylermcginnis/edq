var React = require('react');
var ClassBadge = require('./ClassBadge');
var requireAuth = require('../../../utils/authenticated');
var Rebase = require('../../../utils/firebase/rebase');
var appConstants = require('../../../constants/appConstants');
var classHelpers = require('../../../utils/firebase/classHelpers');
var helpers = require('../../../utils/firebase/helpers');

var base = Rebase.createClass(appConstants.FIREBASE_URL);

var Dashboard = requireAuth(class extends React.Component{
  constructor(){
    this.state = {
      classes: [],
      userId: helpers.getCurrentUserId()
    }
  }
  componentDidMount(){
    base.bindToState(`users/${this.state.userId}/classes`, {
      context: this,
      asArray: true,
      state: 'classes'
    });
  }
  componentWillUnmount(){
    base.removeBinding(`users/${this.state.userId}/classes`);
  }
  handleSubmit(e){
    e.preventDefault();
    var newClassName = this.refs.newClass.getDOMNode().value;
    this.refs.newClass.getDOMNode().value = '';
    classHelpers.addNewClassToFB(this.state.userId, newClassName);
  }
  render(){
    var styles = {
      outerContainer: {
        padding: 3,
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      },
      container: {
        backgroundColor: '#f8f8f8',
        position: 'relative',
        marginLeft: 2,
        boxSizing: 'border-box',
        height: '100%',
        padding: 15,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 0
      },
      topBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 3,
        width: '100%',
        background: '#6DA5CD',
      },
      label: {
        fontSize: 17
      }
    };
    var list = this.state.classes.map((item, index) => {
      return (
        <ClassBadge info={item} index={index} key={index} />
      )
    });
    return (
      <span>
        <div className="col-sm-4" style={styles.outerContainer}>
          <div style={styles.container}>
            <span style={styles.topBar}></span>
            <form className="col-sm-10">
              <div className="form-group">
                <label style={styles.label}>Class Name</label>
                <input type="text" ref="newClass" className="form-control" placeholder="Class Name" />
              </div>
              <button type="submit" className="btn btn-default" onClick={this.handleSubmit.bind(this)}>Submit</button>
            </form>
          </div>
        </div>
        {list}
      </span>
    )
  }
});

module.exports = Dashboard;