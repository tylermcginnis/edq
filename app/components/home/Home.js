var React = require('react');
var styles = require('./homeStyles');

class Home extends React.Component{
  render(){
    return (
      <div className="col-sm-12">
        <h1 className="text-center">Teacher Feedback in Real Time</h1>
        <h2 className="text-center">A More Effective Lecture Management Tool</h2>
        <div className="col-sm-12" style={styles.cushion}>
          <div className="browser col-sm-8 pull-left">
            <div className="browser-top"></div>
            <div className="menu col-sm-12"></div>
            <div className="browser-body col-sm-12">
              <div className="slider col-sm-10 col-sm-offset-1">
                <div className="container">
                  <div className="slider-bar">
                    <div id="pin" className="pin-container">
                      <div className="pin-inner">91</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="queue-container col-sm-10 col-sm-offset-1">
                <div className="queue-item in-queue col-sm-12" style={{borderTop: "2px solid #7A7CD5"}}>
                  <div className="pull-left">
                    <img  style={styles.img} src="https://avatars1.githubusercontent.com/u/3782604?v=3&s=55" />
                  </div>
                  <div className="pull-left">
                    <div style={styles.name}> Ean Platter </div>
                    <div style={styles.question}> How do I center a jQuery? </div>
                  </div>
                </div>
                <div className="queue-item in-queue col-sm-12" style={{borderTop: "2px solid #6DA5CD"}}>
                  <div className="pull-left">
                    <img  style={styles.img} src="http://www.gravatar.com/avatar/dd2fcc292959517dfc577b5f158f106a?s=55&amp;r=g&amp;d=mm" />
                  </div>
                  <div className="pull-left">
                    <div style={styles.name}> Tyler McGinnis </div>
                    <div style={styles.question}> In homotopy type theory, is there a IsManifold predicate? </div>
                  </div>
                </div>
                <div className="queue-item in-queue col-sm-12">
                  <div className="pull-left">
                    <img  style={styles.img} src="https://avatars2.githubusercontent.com/u/8698364?v=3&s=55" />
                  </div>
                  <div className="pull-left">
                    <div style={styles.name}> Jacob Turner </div>
                    <div style={styles.question}> What is love? </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-4 pull-left">
            Right Panel
          </div>
        </div>
      </div>
    )
  }
};

module.exports = Home;