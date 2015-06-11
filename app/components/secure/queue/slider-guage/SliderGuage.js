var React = require('react');
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
    var styles = {
      pinContainerMove: {left: this.props.status + '%', cursor: 'move'},
      pinContainerDefault: {left: this.props.status + '%', cursor: 'default'},
    };
    if(this.props.draggable === true){
      drag = (
        <Draggable axis="x" bounds="parent" onStop={this.handleStop.bind(this)} onDrag={this.handleDrag.bind(this)}>
          <div id="pin" className="pin-container" style={styles.pinContainerMove}>
            <div className="pin-inner">
              {this.state.currentStatus}
            </div>
          </div>
        </Draggable>
      )
    } else {
      drag = (
        <div id="pin" className="pin-container" style={styles.pinContainerDefault}>
          <div className="pin-inner">
            {this.props.status}
          </div>
        </div>
      );
    };
    return (
      <span className="slider">
        <div className="inner-container" ref="slider">
          <div className="slider-bar">
            {drag}
          </div>
        </div>
      </span>
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