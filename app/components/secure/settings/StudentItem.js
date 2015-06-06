var React = require('react');

class StudentItem extends React.Component{
  render(){
    var styles = {
      name: {
        fontSize: 17
      },
      email: {
        fontSize: 15
      }
    }
    return (
      <div className="col-sm-12 text-center">
        <div className="pull-right">
          <span onClick={this.props.remove.bind(null)} className="glyphicon glyphicon-remove"></span>
        </div>
        <div style={styles.name}>
          {this.props.user.firstName + " " + this.props.user.lastName}
        </div>
        <div style={styles.email}>
          {this.props.user.email}
        </div>
      </div>
    )
  }
};

module.exports = StudentItem;