var React = require('react');
var Gravatar = require('react-gravatar');

class QueueItem extends React.Component{
  render(){
    var styles = {
      avatar: {
        position: 'relative',
        padding: 0
      },
      imageText: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        textAlign: 'center',
        width: '130px',
        background: "rgba(0, 0, 0, 0.75)",
        color: '#fff',
        cursor: 'pointer',
        fontSize: '18px'
      }
    }
    var imageText = this.props.isAdmin === true ? <span style={styles.imageText}> Answer </span> : <span style={styles.imageText}> Remove </span>;
    return (
      <div className='col-sm-12'>
        <div className="pull-left" style={styles.avatar}>
          <Gravatar email={this.props.item.email} size={130} default="mm" />
          {imageText}
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