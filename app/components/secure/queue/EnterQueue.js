var React = require('react');
var Card = require('../../card/Card');

class EnterQueue extends React.Component{
  enter(){
    var question = this.refs.question.getDOMNode().value;
    var anon = this.refs.anonymous.getDOMNode().checked;
    this.refs.question.getDOMNode().value = '';
    this.refs.anonymous.getDOMNode().checked = false;
    this.props.enter(question, anon);
  }
  render(){
    var styles = {
      container: {
        paddingTop: 13
      },
      pad: {
        marginRight: 15
      }
    }
    return (
      <div className="col-sm-12" style={styles.container}>
        <div className="col-sm-12 form-group">
          <input type="text" className="form-control" ref="question" placeholder="Question..." />
        </div>
        <div className="col-sm-12">
          <button style={styles.pad} className="btn btn-primary" onClick={this.enter.bind(this)} > Enter Queue </button>
          Anonymous? <input type="checkbox" ref="anonymous" />
        </div>
      </div>
    )
  }
};

module.exports = EnterQueue;