var React = require('react');

class StudentItem extends React.Component{
  render(){
    return (
      <div>
        <span onClick={this.props.remove.bind(null, this.props.index, this.props.email)}> XXX</span> <br />
        Name: {this.props.name} <br />
        Email: {this.props.email}
      </div>
    )
  }
};

module.exports = StudentItem;