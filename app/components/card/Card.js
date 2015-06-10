var React = require('react');
var styling = require('./cardStyling');

class Card extends React.Component{
  colorMixin(bgColor){
    styling.topBar.background = bgColor;
  }
  render(){
    this.props.color && this.colorMixin(this.props.color);
    this.props.height && (styling.cardContainer.height = this.props.height);
    var klassName = `col-sm-${this.props.size}`
    return (
      <div className={klassName} style={styling.cardContainer}>
        <div style={styling.card}>
          <span style={styling.topBar}></span>
          {this.props.children}
        </div>
      </div>
    )
  }
};

Card.propTypes = {
  size: React.PropTypes.number.isRequired
};

module.exports = Card;