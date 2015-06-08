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
      },
      layover: {
        backgroundColor: "rgba(46, 46, 46, 0.75)",
        padding: '0',
        zIndex: 99,
        position: 'absolute',
        left: 0,
        top: 0,
        color: 'white',
        width: '100%',
        height: '100%',
        textAlign: 'center',
        lineHeight: '120px',
        fontSize: '45px'
      },
      remove: {
        position: 'absolute',
        right: '10',
        top: 10,
        fontSize: 15,
        cursor: 'pointer'
      }
    }
    var layover = <span></span>;
    var removeUser = <span></span>
    this.props.isAdmin === true && (removeUser = <span onClick={this.props.removeUser.bind(null)} className="glyphicon glyphicon-remove" style={styles.remove}></span>);
    if(this.props.item.beingHelped){
      layover = (
        <div className="col-sm-12" style={styles.layover}>
          {removeUser}
          {this.props.item.beingHelped}
        </div>
      )
    }
    return (
      <div className='col-sm-12' style={styles.avatar}>
        {layover}
        <div className="pull-left" style={styles.avatar} onClick={this.props.button.bind(null)}>
          <Gravatar email={this.props.item.email} size={130} default="mm" />
          <span style={styles.imageText}> {this.props.isAdmin === true ? "Answer" : "Cancel"} </span>
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