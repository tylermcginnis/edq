var React = require('react');

class StudentItem extends React.Component{
  render(){
    return (
      <div>
        <span onClick={this.props.remove.bind(null)}> XXX</span> <br />
        FirstName: {this.props.user.firstName} <br />
        LastName: {this.props.user.lastName} <br />
        Email: {this.props.user.email} <br />
        Type: {this.props.user.userType}
      </div>
    )
  }
};

module.exports = StudentItem;