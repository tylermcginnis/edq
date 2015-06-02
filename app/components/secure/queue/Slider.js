var React = require('react');

class Slider extends React.Component {
  render(){
    var styles = {
      innerContainer: {
        display: "flex",
        justifyContent: "center",
        height: '35px',
        backgroundColor: '#f8f8f8',
        borderRadius: '20px',
        width: '100%',
        boxShadow: 'inset 1px 1px 2px 0px rgba(229, 225, 225, 0.75)'
      },
      sliderBar: {
        width: '90%',
        height: '6px',
        backgroundColor: 'rgba(119, 119, 119, 0.32)',
        alignSelf: 'center',
        borderRadius: '6px',
        borderBottom: '1px solid #fff',
        borderTop: '1px solid rgb(169, 169, 169)'
      }
    }
    return (
      <div style={styles.innerContainer}>
        <div style={styles.sliderBar}>
          <div>
            <div>
              <div> {this.props.status} </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

Slider.propTypes = {
  status: React.PropTypes.number.isRequired
}

module.exports = Slider;