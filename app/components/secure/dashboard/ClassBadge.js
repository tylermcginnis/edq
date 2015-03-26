var React = require('react');

class ClassBadge extends React.Component{
  render(){
    return (
      <div className="col-sm-4 card">
        <span className="pull-right" onClick={this.props.removeClass.bind(null, this.props.index)}> X </span>
        <div className="col-sm-12 text-center">
          <h2> {this.props.info.name} </h2>
          <div className="btn btn-primary col-sm-12">
            Go to Queue
          </div>
        </div>
      </div>
    )
  }
};

module.exports = ClassBadge;