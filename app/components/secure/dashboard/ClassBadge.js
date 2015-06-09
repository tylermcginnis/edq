var React = require('react');

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
        right: 8,
        fontSize: 18,
        cursor: 'pointer'
      },
      member: {
        width: '100%',
        position: 'absolute',
        height: '100%'
      },
    };
    var header;
    if(this.props.info.isTeacher === true){
      styles.member.background = '#44bf87';
      header = (
        <div style={this.props.styles.topBar}>
          <span style={styles.member}></span>
          <span className="pull-right" style={styles.cog} onClick={this.goToSettings.bind(this, this.props.index)}><i className="fa fa-cog"></i></span>
        </div>
      );
    } else {
      styles.member.background = '#7A7CD5'
      header = (
        <div style={this.props.styles.topBar}>
          <span style={styles.member}></span>
        </div>
      );
    };

    return (
      <div className="col-sm-4" style={this.props.styles.cardContainer}>
        <div style={this.props.styles.card}>
          {header}
          <div className="col-sm-12 text-center">
            <h2 style={{paddingBottom: 10}}> {this.props.info.name} </h2>
            <div className="btn btn-primary col-sm-12" onClick={this.goToQueue.bind(this, this.props.index)}>
              Go to Queue
            </div>
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