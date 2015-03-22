var React = require('react');
var Router = require('react-router');
var authActions = require('../../actions/authActions');

class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {error: false};
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    var { router } = this.context;
    var email = this.refs.email.getDOMNode().value;
    var password = this.refs.pw.getDOMNode().value;
    var nextPath = router.getCurrentQuery().nextPath;
    authActions.loginWithPW({email, password}, () => {
      if(nextPath){
        this.context.router.transitionTo(nextPath);
      } else {
        this.context.router.replaceWith('dashboard');
      }
    });
  }
  render(){
    var errors = this.state.error ? <p> Error on Login </p> : '';
    return (
      <div className="col-sm-6 col-sm-offset-3">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label> Email </label>
            <input className="form-control" ref="email" placeholder="Email"/>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input ref="pw" type="password" className="form-control" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
          {errors}
        </form>
      </div>
    );
  }
};

Login.contextTypes = {
  router: React.PropTypes.func.isRequired
}

module.exports = Login;