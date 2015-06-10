var appConstants = require('../../constants/appConstants');

module.exports = {
  cardContainer: {
    margin: "10px 0px",
    padding: "0 4px",
    height: 200,
    position: 'relative',
  },
  card: {
    backgroundColor: '#f8f8f8',
    position: 'relative',
    marginLeft: 2,
    boxSizing: 'border-box',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0
  },
  topBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 3,
    width: '100%',
    background: appConstants.blue,
  }
};
