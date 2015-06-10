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
    console.log('event', e);
    console.log('UI', ui);
  }
  handleStop(e, ui){
    console.log('STop');
    console.log('event', e);
    console.log('pos', ui.position);
  }
  componentDidMount(){
    var width = this.refs.slider.getDOMNode().offsetWidth;
    this.setState({width});
  }
  render(){
    var drag;
    styles.lightTheme.pinContainer.left = this.props.status + '%';
    if(this.props.draggable === true){
      styles.lightTheme.pinContainer.cursor = 'move';
      drag = (
        <Draggable axis="x" bounds="parent" onStop={this.handleStop} onDrag={this.handleDrag}>
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