var React = require('react');

class EnterQueue extends React.Component{
  enter(){
    var question = this.refs.question.getDOMNode().value;
    var anon = this.refs.anonymous.getDOMNode().checked;
    this.refs.question.getDOMNode().value = '';
    this.refs.anonymous.getDOMNode().checked = false;
    this.props.enter(question, anon);
  }
  render(){
    var styles = {}
    return (
      <div className="col-sm-12">
        <div className="col-sm-8 pull-left">
          <div className="col-sm-12 form-group">
            <input type="text" className="form-control" ref="question" placeholder="Question..." />
            Anonymous? <input type="checkbox" ref="anonymous" />
          </div>
        </div>
        <div className="col-sm-4 pull-left form-group">
          <button className="btn btn-primary" onClick={this.enter.bind(this)} > Enter Queue </button>
        </div>
      </div>
    )
  }
};

module.exports = EnterQueue;