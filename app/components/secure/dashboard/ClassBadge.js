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
      outerContainer: {
        padding: 3,
        height: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      },
      container: {
        backgroundColor: '#f8f8f8',
        position: 'relative',
        marginLeft: 2,
        boxSizing: 'border-box',
        height: '100%',
        padding: 15,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 0
      },
      cog: {
        position: 'absolute',
        top: 4,
        right: 8,
        fontSize: 18,
        cursor: 'pointer'
      },
      headerContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 3,
      },
      teacher: {
        width: '100%',
        background: '#44bf87',
        position: 'absolute',
        height: '100%'
      },
      student: {
        width: '100%',
        background: '#7A7CD5',
        position: 'absolute',
        height: '100%'
      }
    };
    var header = this.props.info.isTeacher === true ?
      (
        <div style={styles.headerContainer}>
          <span style={styles.teacher}></span>
          <span className="pull-right" style={styles.cog} onClick={this.goToSettings.bind(this, this.props.index)}><i className="fa fa-cog"></i></span>
        </div>
      ) :
      (
        <div style={styles.headerContainer}>
          <span style={styles.student}></span>
        </div>
      );

    return (
      <div className="col-sm-4" style={styles.outerContainer}>
        <div style={styles.container}>
          {header}
          <div className="col-sm-12 text-center" style={styles.innerContainer}>
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