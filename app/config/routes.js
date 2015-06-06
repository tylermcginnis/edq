var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var Main = require('../components/Main');
var Register = require('../components/login-register/Register');
var Login = require("../components/login-register/Login");
var Logout = require('../components/login-register/Logout');
var Dashboard = require('../components/secure/dashboard/Dashboard');
var ClassSetting = require('../components/secure/class-setting/ClassSetting');
var Queue = require('../components/secure/queue/Queue');

var routes = (
  <Route handler={Main} >
    <Route name="login" handler={Login} />
    <Route name="logout" handler={Logout} />
    <Route name="register" handler={Register} />
    <Route name="queue" path="/queue/:class" handler={Queue} />
    <Route name="settings" path="/settings/:class" handler={ClassSetting} />
    <Route name="dashboard" path="/" handler={Dashboard} />
  </Route>
);

module.exports = routes;