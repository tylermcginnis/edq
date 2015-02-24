var React = require('react');

var Class = React.createClass({
  render: function(){
    /*
    var setMemberStr = function(){
      var length = Object.keys(this.props.info.members).length || 0;
      var word = length === 1 ? " Member" : " Members";
      return (length + word);
    };
    var setQueueLength = function(){
      var length = this.props.info.queue ? Object.keys(this.props.info.queue).length : 0;
      var word = " in Queue";
      return (length + word);
    };
    */
    return (
      <div className="col-sm-4 card">
        <span className="pull-right" onClick={this.props.removeClass.bind(null, this.props.index)}> X </span>
        <div className="col-sm-12 text-center">
          <h2> {this.props.info.name} </h2>
          {
            /*
            <h5> {setMemberStr.call(this)} </h5>
            <h5> {setQueueLength.call(this)} </h5>
            */
          }
          <div className="btn btn-primary col-sm-12">
            Enter Queue
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Class;