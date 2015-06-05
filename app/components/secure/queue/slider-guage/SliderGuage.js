var React = require('react');
var styles = require('./sliderGuageStyles');

class SliderGuage extends React.Component {
  render(){
    styles.lightTheme.pinContainer.left = this.props.status + '%';
    return (
      <div style={styles.lightTheme.innerContainer}>
        <div style={styles.lightTheme.sliderBar}>
          <div id="pin" style={styles.lightTheme.pinContainer}>
            <div style={styles.lightTheme.pinInner}>
              {this.props.status}
            </div>
          </div>
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