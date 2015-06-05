var React = require('react');
var Router = require('react-router');
var routes = require('./config/routes');

Router.run(routes, (Handler, state) => {
  React.render(<Handler {...state}/> , document.getElementById('app'));
});