var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Main = require('../components/Main');
var Register = require('../components/login-register/Register');
var Login = require("../components/login-register/Login");
var Logout = require('../components/login-register/Logout');
var Dashboard = require('../components/secure/dashboard/Dashboard');
var Home = require("../components/Home");
var Settings = require('../components/secure/settings/Settings');

var routes = (
  <Route handler={Main} >
    <Route name="login" handler={Login} />
    <Route name="logout" handler={Logout} />
    <Route name="register" handler={Register} />
    <Route name="dashboard" handler={Dashboard} />
    <Route name="settings" path="/settings/:class" handler={Settings} />
    <Route name="home" path="/" handler={Home} />
  </Route>
);

module.exports = routes;