var appConstants = require('../../constants/appConstants');

module.exports = {
  cardContainer: {
    padding: 3,
    minHeight: 200,
    height: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative'
  },
  card: {
    backgroundColor: '#f8f8f8',
    position: 'relative',
    marginLeft: 2,
    boxSizing: 'border-box',
    height: '100%',
    padding: 15,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 0
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