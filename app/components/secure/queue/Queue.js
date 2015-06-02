var React = require('react');
var ClassStatus = require('./ClassStatus');
var queueStore = require('../../../stores/queueStore');
var QueueItem = require('./QueueItem');
var queueActions = require('../../../actions/queueActions');
var userStore = require('../../../stores/userStore');

class Queue extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      queue: queueStore.getQueue(),
      status: queueStore.getStatus()
    };
  }
  componentDidMount(){
    queueStore.addChangeListener(this._onChange.bind(this));
    var className = this.context.router.getCurrentParams().class;
    var userId = userStore.getUser().pushId;
    queueActions.initQueue(userId, className);
  }
  componentWillUnmount(){
    queueStore.removeChangeListener(this._onChange.bind(this));
  }
  _onChange(){
    this.setState({
      queue: queueStore.getQueue(),
      status: queueStore.getStats()
    })
  }
  render(){
    var className = this.context.router.getCurrentParams().class;
    var list = this.state.queue.map((item, index) => {
      return (
        <QueueItem item={item} index={index} key={index} />
      )
    });
    return (
      <div>
        <ClassStatus status={this.state.status} />
        <p> QUEUE MAIN - {className} </p>
        {list}
      </div>
    )
  }
};

Queue.contextTypes = {
  router: React.PropTypes.func.isRequired
}


module.exports = Queue;