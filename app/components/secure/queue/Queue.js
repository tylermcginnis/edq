var React = require('react');

class Queue extends React.Component {
  render(){
    var className = this.context.router.getCurrentParams().class;
    return (
      <div> THE QUEUEUEUEU {className} </div>
    )
  }
};

Queue.contextTypes = {
  router: React.PropTypes.func.isRequired
}


module.exports = Queue;