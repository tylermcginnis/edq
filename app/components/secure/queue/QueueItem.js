var React = require('react');
var Gravatar = require('react-gravatar');

class QueueItem extends React.Component{
  render(){
    return (
      <div className='col-sm-12'>
        <div className="col-sm-3 pull-left">
          <Gravatar email={this.props.item.email} size={150} default="mm" />
        </div>
        <div className="col-sm-9 pull-left">
          <p> {this.props.item.name} </p>
          <p> {this.props.item.question} </p>
        </div>
      </div>
    );
  }
};

QueueItem.propTypes = {}

module.exports = QueueItem;