var React = require('react');
var Router = require('react-router');
var {RouteHandler, Link} = Router;
var auth = require('../utils/firebase/auth');
var Gravatar = require('react-gravatar');
var helpers = require('../utils/firebase/helpers');

class Main extends React.Component {
  constructor(props){
    this.state = {
      loggedIn: auth.isLoggedIn()
    }
  }
  handleLogout(loggedIn){
    this.setState({loggedIn});
  }
  componentWillMount(){
    auth.onChange = this.handleLogout.bind(this);
  }
  render(){
    var styles = {
      logo: {
        width: 25,
        float: 'left',
        margin: 5,
        marginRight: 11,
        marginTop: 10
      },
      navbar: {
        backgroundColor: '#373d44',
        color: '#f8f8f8'
      },
      gravatar: {
        position: 'relative',
        top: 5,
        right: 10
      }
    };
    var icon = null;
    var register = null;
    var loginOrOut;
    if(this.state.loggedIn){
      var user = helpers.getLocalUser();
      if(user){
        icon = <li style={styles.gravatar}><Gravatar email={user.email} size={40} default="mm" /></li>;
      }
      loginOrOut = <li><Link to="logout" className="navbar-brand">Logout</Link></li>;
    } else {
      loginOrOut = <li><Link to="login" className="navbar-brand">Login</Link></li>;
      register = <li><Link to="register" className="navbar-brand"> Register </Link></li>;
    }
    return (
      <span>
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <img src="../images/logo-mini.png" style={styles.logo} />
              <a href="http://www.google.com" className="navbar-brand">EDQ </a>
            </div>
            <ul className="nav navbar-nav pull-right">
              {icon}
              <li><Link to="dashboard" className="navbar-brand">Dashboard</Link></li>
              {register}
              {loginOrOut}
            </ul>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <RouteHandler {...this.props}/>
          </div>
        </div>
      </span>
    )
  }
};

module.exports = Main;