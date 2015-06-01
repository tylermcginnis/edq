var React = require('react');

class StudentItem extends React.Component{
  render(){
    return (
      <div>
        <span onClick={this.props.remove.bind(null, this.props.index)}> XXX</span> <br />
        FirstName: {this.props.firstName} <br />
        LastName: {this.props.lastName} <br />
        Email: {this.props.email}
      </div>
    )
  }
};

module.exports = StudentItem;