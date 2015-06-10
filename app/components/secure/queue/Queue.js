var React = require('react');
var SliderGuage = require('./slider-guage/SliderGuage');
var QueueItem = require('./QueueItem');
var Rebase = require('../../../utils/firebase/rebase');
var appConstants = require('../../../constants/appConstants');
var helpers = require('../../../utils/firebase/helpers');
var EnterQueue = require('./EnterQueue');
var Card = require('../../card/Card');

var base = Rebase.createClass(appConstants.FIREBASE_URL);

class Queue extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      queue: [],
      user: {},
      status: 0
    };
  }
  componentDidMount(){
    var userId = helpers.getCurrentUserId();

    //todo: check to make sure syncState isn't called with asArray
    base.syncState(`queue/${this.props.query.classId}`, {
      context: this,
      state: 'queue',
      asArray: true
    });

    base.bindToState(`users/${userId}/classes/${this.props.query.classId}`, {
      context: this,
      state: 'user'
    });

    base.listenTo(`studentStatus/${this.props.query.classId}`, {
      context: this,
      asArray: true,
      then(data){
        var total = 0;
        data.forEach((item) => {
          total += item;
        });
        var avg = Math.floor((total / data.length));
        isNaN(avg) && (avg = 0);
        avg > 100 && (avg = 100)
        this.setState({
          status: avg
        });
      }
    });
  }
  componentWillUnmount(){
    base.removeBinding(`queue/${this.props.query.classId}`);
    base.removeBinding(`users/${helpers.getCurrentUserId()}/classes/${this.props.query.classId}`);
    base.removeBinding(`studentStatus/${this.props.query.classId}`);
  }
  joinQueue(question, anon){
    var user = JSON.parse(localStorage.getItem('user'));
    var email = anon ? '' : user.email;
    var name = anon ? 'Anonymous' : user.firstName + ' ' + user.lastName;
    var userId = user.pushId;
    var beingHelped = false;
    var beingHelpedBy = false;
    this.setState({
      queue: this.state.queue.concat([{question, anon, email, name, userId, beingHelped}])
    });
  }
  answer(index){
    var temp = this.state.queue;
    var helper = JSON.parse(localStorage.getItem('user'));
    temp[index].beingHelped = helper.firstName + ' ' + helper.lastName;
    this.setState({
      queue: temp
    });
  }
  removeUser(index, item){
    var user = helpers.getLocalUser();
    if(item.email === user.email){
      var temp = this.state.queue;
      temp.splice(index, 1);
      this.setState({
        queue: temp
      })
    }
  }
  updateStatus(status){
    var userId = helpers.getCurrentUserId();
    base.post(`studentStatus/${this.props.query.classId}/${userId}`, {
      data: status,
    });
  }
  render(){
    var enter, list, isAdmin, status, slider;
    var height = 165;
    if(this.state.user.isTeacher || this.state.user.isMentor){
      status = this.state.status;
      enter = <span></span>
      slider = <SliderGuage status={status} draggable={false} />
      isAdmin = true;
    } else if(this.state.user.isStudent){
      status = 0;
      slider = <SliderGuage status={0} draggable={true} updateStatus={this.updateStatus.bind(this)} />
      enter = (<Card size={12} color={appConstants.blue} height={130}>
                <EnterQueue enter={this.joinQueue.bind(this)} />
              </Card>);
      isAdmin = false;
    }
    list = this.state.queue.map((item, index) => {
      var showRemoveBtn = item.email === helpers.getLocalUser().email;
      if(isAdmin === true){
        return (
          <Card size={12} height={height} color={appConstants.purple} key={index} >
            <QueueItem
              item={item}
              isAdmin={'isAdmin'}
              button={this.answer.bind(this, index)}
              removeUser={this.removeUser.bind(this, index)}
              showRemoveBtn={true} />
          </Card>
        )
      } else {
        return (
          <Card size={12} height={height} color={appConstants.green} key={index}>
            <QueueItem
              item={item}
              isAdmin={isAdmin}
              showRemoveBtn={showRemoveBtn}
              button={this.removeUser.bind(this, index, item)} />
          </Card>
        );
      }
    });
    var className = this.context.router.getCurrentParams().class;
    return (
      <div className="col-sm-12">
        <h1 className="text-center"> {className} </h1>
        {slider} <br />
        {enter} <br />
        {list} <br />
      </div>
    )
  }
};

Queue.contextTypes = {
  router: React.PropTypes.func.isRequired
}


module.exports = Queue;