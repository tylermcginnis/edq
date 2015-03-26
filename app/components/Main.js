var React = require('react');
var Router = require('react-router');
var {RouteHandler, Link} = Router;
var firebaseUtils = require('../utils/firebase/firebaseUtils');

class Main extends React.Component {
  constructor(props){
    this.state = {
      loggedIn: firebaseUtils.isLoggedIn()
    }
  }
  handleLogout(loggedIn){
    this.setState({loggedIn});
  }
  componentWillMount(){
    firebaseUtils.onChange = this.handleLogout.bind(this)
  }
  render(){
    var loginOrOut;
    var register;
    if(this.state.loggedIn){
      loginOrOut = <li><Link to="logout" className="navbar-brand">Logout</Link></li>;
      register = null
    } else {
      loginOrOut = <li><Link to="login" className="navbar-brand">Login</Link></li>;
      register = <li><Link to="register" className="navbar-brand"> Register </Link></li>;
    }
    return (
      <span>
        <nav className="navbar navbar-default navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <Link to="home" className="navbar-brand"> EDQ </Link>
            </div>
            <ul className="nav navbar-nav pull-right">
              <li><Link to="home" className="navbar-brand"> Home </Link></li>
              <li><Link to="dashboard" className="navbar-brand"> Dashboard </Link></li>
              {register}
              {loginOrOut}
            </ul>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <RouteHandler />
          </div>
        </div>
      </span>
    )
  }
};

module.exports = Main;