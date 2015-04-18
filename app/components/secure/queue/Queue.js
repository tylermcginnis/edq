var React = require('react');
var ClassStatus = require('./ClassStatus');
var queueStore = require('../../../stores/queueStore');
var QueueItem = require('./QueueItem');


class Queue extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      queue: queueStore.getQueue()
    };
  }
  componentDidMount(){
    var className = this.context.router.getCurrentParams().class;
    //get queue from firebase then pass it to actions which will dispatch and update the store.

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
        <ClassStatus />
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