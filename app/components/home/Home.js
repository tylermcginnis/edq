var React = require('react');
var styles = require('./homeStyles');

class Home extends React.Component{
  register(){
    this.context.router.transitionTo('register');
  }
  render(){
    return (
      <div className="col-xs-12">
        <h1 className="text-center">Teacher Feedback in Real Time</h1>
        <h2 className="text-center">A More Effective Lecture Management Tool</h2>
        <div className="col-xs-12" style={styles.cushion}>
          <div className="browser col-xs-10 col-xs-offset-1">
            <div className="browser-top"></div>
            <div className="menu col-xs-12"></div>
            <div className="browser-body col-xs-12">
              <div className="slider col-xs-10 col-xs-offset-1">
                <h4 className="text-center" style={{marginBottom: 0}}>Class Status</h4>
                <div className="container">
                  <div className="slider-bar">
                    <div id="pin" className="pin-container">
                      <div className="pin-inner">87</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="queue-container col-xs-10 col-xs-offset-1">
                <h4 className="text-center">Queue</h4>
                <div className="queue-item in-queue col-xs-12" style={{borderTop: "2px solid #7A7CD5"}}>
                  <div className="pull-left">
                    <img  style={styles.img} src="https://avatars1.githubusercontent.com/u/3782604?v=3&s=55" />
                  </div>
                  <div>
                    <div style={styles.name}> Ean Platter </div>
                    <div style={styles.question}> How do I center a jQuery? </div>
                  </div>
                </div>
                <div className="queue-item in-queue col-xs-12" style={{borderTop: "2px solid #6DA5CD"}}>
                  <div className="pull-left">
                    <img  style={styles.img} src="http://www.gravatar.com/avatar/dd2fcc292959517dfc577b5f158f106a?s=55&amp;r=g&amp;d=mm" />
                  </div>
                  <div>
                    <div style={styles.name}> Tyler McGinnis </div>
                    <div style={styles.question}> In homotopy type theory, is there a IsManifold predicate? </div>
                  </div>
                </div>
                <div className="queue-item in-queue col-xs-12">
                  <div className="pull-left">
                    <img  style={styles.img} src="https://avatars2.githubusercontent.com/u/8698364?v=3&s=55" />
                  </div>
                  <div>
                    <div style={styles.name}> Jacob Turner </div>
                    <div style={styles.question}> What is love? </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xs-4 col-xs-offset-4" style={styles.cushion}>
          <button
            style={styles.btn}
            type="submit"
            className="btn btn-primary"
            onClick={this.register.bind(this)}>Register</button>
        </div>
      </div>
    )
  }
};

Home.contextTypes = {
  router: React.PropTypes.func.isRequired
};

module.exports = Home;