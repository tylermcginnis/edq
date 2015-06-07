var React = require('react');

class QueueItem extends React.Component{
  render(){
    return (
      <div>
        <p> Question: {this.props.item.question} </p>
      </div>
    );
  }
};

QueueItem.propTypes = {}

module.exports = QueueItem;