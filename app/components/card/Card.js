var React = require('react');
var appConstants = require('../../constants/appConstants');

class Card extends React.Component{
  render(){
    var borderTop = this.props.color ? `3px solid ${this.props.color}` : `3px solid ${appConstants.blue}`
    var height = this.props.height || '';
    var klassName = `col-sm-${this.props.size} card-container`;
    return (
      <div className={klassName} style={{height}}>
        <div className="card" style={{borderTop}}>
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