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
    var user = JSON.parse(localStorage.getItem('user'));
    this.setState({
      queue: this.state.queue.concat([{question, anon, user}])
    });
  }
  render(){
    var slider, enter, list;
    if(this.state.user.isTeacher || this.state.user.isMentor){
      slider = <SliderGuage status={this.state.status} />
      enter = <span></span>
      list = this.state.queue.map((item, index) => {
        return <QueueItem item={item} key={index} isAdmin={true} />
      });
    } else if(this.state.user.isStudent){
      slider = <SliderGuage status={0} />;
      enter = <EnterQueue enter={this.joinQueue.bind(this)} />;
      list = this.state.queue.map((item, index) => {
        return <QueueItem item={item} key={index} isAdmin={false} />
      });
    }
    var className = this.context.router.getCurrentParams().class;
    return (
      <div className="col-sm-12">
        <h1 className="text-center"> {className} </h1>
        {slider} <br />
        {enter} <br />
        {list} <br />
      </div>
    )
  }
};

Queue.contextTypes = {
  router: React.PropTypes.func.isRequired
}


module.exports = Queue;