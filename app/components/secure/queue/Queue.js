var React = require('react');
var SliderGuage = require('./slider-guage/SliderGuage');
var QueueItem = require('./QueueItem');
var Rebase = require('../../../utils/firebase/rebase');
var appConstants = require('../../../constants/appConstants');
var helpers = require('../../../utils/firebase/helpers');
var EnterQueue = require('./EnterQueue');

var base = Rebase.createClass(appConstants.FIREBASE_URL);

class Queue extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      queue: [],
      user: {},
      status: 0
    };
  }
  componentDidMount(){
    var userId = helpers.getCurrentUserId();

    //todo: check to make sure syncState isn't called with asArray
    base.syncState(`queue/${this.props.query.classId}`, {
      context: this,
      state: 'queue'
    });

    base.bindToState(`users/${userId}/classes/${this.props.query.classId}`, {
      context: this,
      state: 'user'
    });

    base.listenTo(`studentStatus/${this.props.query.classId}`, {
      context: this,
      asArray: true,
      then(data){
        var total = 0;
        data.forEach((item) => {
          total += item;
        });
        var avg = Math.floor((total / data.length));
        isNaN(avg) && (avg = 0);
        avg > 100 && (avg = 100)
        this.setState({
          status: avg
        });
      }
    });
  }
  componentWillUnmount(){
    base.removeBinding(`queue/${this.props.query.classId}`);
    base.removeBinding(`users/${helpers.getCurrentUserId()}/classes/${this.props.query.classId}`);
    base.removeBinding(`studentStatus/${this.props.query.classId}`);
  }
  joinQueue(question, anon){
    this.setState({
      queue: this.state.queue.concat([{question, anon}])
    });
  }
  render(){
    //this.state.user has all the info to verify user is teacher, mentor, or student.
    if(this.state.user.isTeacher || this.state.user.isMentor){
      var isAdmin = true;
    } else {
      var isAdmin = false;
    }
    var className = this.context.router.getCurrentParams().class;
    var list = this.state.queue.map((item, index) => {
      return (
        <QueueItem item={item} index={index} key={index} />
      )
    });
    var thing = isAdmin ? <div> ADMIN!! </div> : <div> Not Admin </div>
    return (
      <div className="col-sm-12">
        <SliderGuage status={this.state.status} />
        <EnterQueue enter={this.joinQueue.bind(this)} />
        <br />
        Is Admin?: {thing} <br /> <br />
        STAUTS: {this.state.status} <br />
        {list} <br />

      </div>
    )
  }
};

Queue.contextTypes = {
  router: React.PropTypes.func.isRequired
}


module.exports = Queue;