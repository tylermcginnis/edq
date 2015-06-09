var React = require('react');
var styling = require('./cardStyling');

class Card extends React.Component{
  colorMixin(bgColor){
    styling.topBar.background = bgColor;
  }
  render(){
    this.props.color && this.colorMixin(this.props.color);
    return (
      <div className="col-sm-4" style={styling.cardContainer}>
        <div style={styling.card}>
          <span style={styling.topBar}></span>
          {this.props.children}
        </div>
      </div>
    )
  }
};

module.exports = Card;