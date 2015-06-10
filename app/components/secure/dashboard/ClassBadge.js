var React = require('react');
var appConstants = require('../../../constants/appConstants');
var Card = require('../../card/Card');

class ClassBadge extends React.Component{
  goToSettings(index){
    var router = this.context.router;
    router.transitionTo('settings', {class: this.props.info.name}, {classId: this.props.info.key});
  }
  goToQueue(){
    var router = this.context.router;
    router.transitionTo('queue', {class: this.props.info.name}, {classId: this.props.info.key});
  }
  render(){
    var styles = {
      cog: {
        position: 'absolute',
        top: 4,
        right: 6,
        fontSize: 18,
        cursor: 'pointer'
      }
    };
    var header;
    if(this.props.info.isTeacher === true){
      return (
        <Card size={4} color={appConstants.green}>
          <span className="pull-right" style={styles.cog} onClick={this.goToSettings.bind(this, this.props.index)}><i className="fa fa-cog"></i></span>
          <div className="col-sm-12 text-center">
            <h2 style={{paddingBottom: 10}}> {this.props.info.name} </h2>
            <div className="btn btn-primary col-sm-12" onClick={this.goToQueue.bind(this, this.props.index)}>
              Go to Queue
            </div>
          </div>
        </Card>
      );
    } else {
      return (
        <Card size={4} color={appConstants.purple}>
          <div className="col-sm-12 text-center">
            <h2 style={{paddingBottom: 10}}> {this.props.info.name} </h2>
            <div className="btn btn-primary col-sm-12" onClick={this.goToQueue.bind(this, this.props.index)}>
              Go to Queue
            </div>
          </div>
        </Card>
      )
    };
  }
};

ClassBadge.contextTypes = {
  router: React.PropTypes.func.isRequired
}

module.exports = ClassBadge;