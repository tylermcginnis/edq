var React = require('react');

class ClassBadge extends React.Component{
  openSettings(index){
    var router = this.context.router;
    router.transitionTo('settings', {class: this.props.info.name});
  }
  render(){
    return (
      <div className="col-sm-4 card">
        <span className="pull-right" onClick={this.openSettings.bind(this, this.props.index)}><i className="fa fa-cog"></i></span>
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

ClassBadge.contextTypes = {
  router: React.PropTypes.func.isRequired
}

module.exports = ClassBadge;