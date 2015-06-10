var React = require('react');

class StudentItem extends React.Component{
  render(){
    var styles = {
      name: {
        fontSize: 19,
        fontWeight: 'bold',
        marginBottom: 5
      },
      email: {
        fontSize: 16,
        marginBottom: 25
      },
      remove: {
        cursor: 'pointer'
      }
    }
    return (
      <div className="col-sm-12 text-center">
        <div style={styles.name}>
          {this.props.user.firstName} <br />
          {this.props.user.lastName}
        </div>
        <div style={styles.email}>
          {this.props.user.email}
        </div>
        <div onClick={this.props.remove.bind(null)} style={styles.remove} className="btn btn-primary">
          Remove User
        </div>
      </div>
    )
  }
};

module.exports = StudentItem;