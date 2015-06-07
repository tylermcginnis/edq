var React = require('react');

class QueueItem extends React.Component{
  render(){
    var name = this.props.item.anon === true ? <p>Anonymous</p> : <p>{this.props.item.user.firstName + ' ' + this.props.item.user.lastName}</p>;
    return (
      <div className='col-sm-12'>
        <div className="col-sm-3 pull-left">
          IMAGE
        </div>
        <div className="col-sm-9 pull-left">
          <p> {name} </p>
          <p> {this.props.item.question} </p>
        </div>
      </div>
    );
  }
};

QueueItem.propTypes = {}

module.exports = QueueItem;