var React = require('react');
var styles = require('./sliderGuageStyles');
var Draggable = require('react-draggable');

class SliderGuage extends React.Component {
  constructor(){
    this.state = {
      width: 0,
      currentStatus: 0
    }
  }
  handleDrag(e, ui){
    this.setState({
      currentStatus: Math.ceil((ui.position.left / this.state.width) * 100)
    });
  }
  handleStop(e, ui){
    this.props.updateStatus(this.state.currentStatus);
  }
  componentDidMount(){
    (function(_this) {
      function resizeHandler() {
        _this.setState({
          width: _this.refs.slider.getDOMNode().offsetWidth - 40
        });
      };
      var resizeTimeout;
      _this.resizeThrottler = function() {
        if ( !resizeTimeout ) {
          resizeTimeout = setTimeout(function() {
            resizeTimeout = null;
            resizeHandler();
           }, 66);
        }
      }
      window.addEventListener("resize", _this.resizeThrottler, false);
    }(this));
    var width =this.refs.slider.getDOMNode().offsetWidth - 40;
    this.setState({width});
  }
  componentWillUnmount(){
    window.removeEventListener("resize", this.resizeThrottler, false);
  }
  render(){
    var drag;
    styles.lightTheme.pinContainer.left = this.props.status + '%';
    if(this.props.draggable === true){
      styles.lightTheme.pinContainer.cursor = 'move';
      drag = (
        <Draggable axis="x" bounds="parent" onStop={this.handleStop.bind(this)} onDrag={this.handleDrag.bind(this)}>
          <div id="pin" style={styles.lightTheme.pinContainer}>
            <div style={styles.lightTheme.pinInner}>
              {this.state.currentStatus}
            </div>
          </div>
        </Draggable>
      )
    } else {
      styles.lightTheme.pinContainer.cursor = 'default'
      drag = (
        <div id="pin" style={styles.lightTheme.pinContainer}>
          <div style={styles.lightTheme.pinInner}>
            {this.props.status}
          </div>
        </div>
      );
    };
    return (
      <div style={styles.lightTheme.innerContainer} ref="slider">
        <div style={styles.lightTheme.sliderBar}>
          {drag}
        </div>
      </div>
    )
  }
};

SliderGuage.propTypes = {
  status: React.PropTypes.number.isRequired
};

SliderGuage.defaultProps = {
  status: 0
};

module.exports = SliderGuage;