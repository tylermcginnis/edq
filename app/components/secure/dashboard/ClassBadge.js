var React = require('react');

class ClassBadge extends React.Component{
  goToSettings(index){
    var router = this.context.router;
    router.transitionTo('settings', {class: this.props.info.name});
  }
  goToQueue(){
    var router = this.context.router;
    router.transitionTo('queue', {class: this.props.info.name});
  }
  render(){
    return (
      <div className="col-sm-4 card">
        {
          this.props.info.isTeacher === true ?
            <span className="pull-right" onClick={this.goToSettings.bind(this, this.props.index)}><i className="fa fa-cog"></i></span> :
            <span></span>
        }
        <div className="col-sm-12 text-center">
          <h2> {this.props.info.name} </h2>
          <div className="btn btn-primary col-sm-12" onClick={this.goToQueue.bind(this, this.props.index)}>
            Go to Queue
          </div>
        </div>
      </div>
    )
  }
};

ClassBadge.contextTypes = {
  router: React.PropTypes.func.isRequired
}

module.exports = ClassBadge;