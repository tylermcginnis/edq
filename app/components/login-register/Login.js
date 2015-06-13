var React = require('react');
var Router = require('react-router');
var auth = require('../../utils/firebase/auth');
var Card = require('../card/Card');
var appConstants = require('../../constants/appConstants');

class Login extends React.Component{
  constructor(props){
    super(props)
    this.state = {error: false};
}
  handleSubmit(e){
    e.preventDefault();
    var { router } = this.context;
    var email = this.refs.email.getDOMNode().value;
    var password = this.refs.pw.getDOMNode().value;
    var nextPath = router.getCurrentQuery().nextPath;
    auth.loginWithPW({email, password}, (err, data) => {
      if(err){
        console.log('Error on Login');
      } else {
        if(nextPath){
          this.context.router.transitionTo(nextPath);
        } else {
          this.context.router.replaceWith('dashboard');
        }
      }
    });
  }
  render(){
    var errors = this.state.error ? <p> Error on Login </p> : '';
    return (
      <span className="col-xs-6 col-xs-offset-3">
        <Card size={12} height={325} color={appConstants.purple}>
          <div className="col-xs-6 col-xs-offset-3">
            <h1 className="text-center"> Login </h1>
            <form onSubmit={this.handleSubmit.bind(this)}>
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
        </Card>
      </span>
    );
  }
};

Login.contextTypes = {
  router: React.PropTypes.func.isRequired
};

module.exports = Login;