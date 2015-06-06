var React = require('react');
var SliderGuage = require('./slider-guage/SliderGuage');
var QueueItem = require('./QueueItem');
var Rebase = require('../../../utils/firebase/rebase');
var appConstants = require('../../../constants/appConstants');
var helpers = require('../../../utils/firebase/helpers');

var base = Rebase.createClass(appConstants.FIREBASE_URL);

class Queue extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      queue: [],
      status: 0
    };
  }
  componentDidMount(){
    var userId = helpers.getCurrentUserId();
    base.listenTo(`users/${userId}/classes/${this.props.query.classId}`, {
      context: this,
      then(data){
        if(data.isMentor || data.isTeacher){
          console.log('TEACHER OR MENTOR');
        } else {
          console.log('STUUUDENT');
        }
      }
    });

    base.bindToState(`queue/${this.props.query.classId}`, {
      asArray: true,
      context: this,
      state: 'queue'
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
    base.removeBinding(`studentStatus/${this.props.query.classId}`)
  }
  render(){
    var className = this.context.router.getCurrentParams().class;
    var list = this.state.queue.map((item, index) => {
      return (
        <QueueItem item={item} index={index} key={index} />
      )
    });
    return (
      <div>
        <SliderGuage status={this.state.status} />
        <p> QUEUE MAIN - {className} </p>
        {list}
      </div>
    )
  }
};

Queue.contextTypes = {
  router: React.PropTypes.func.isRequired
}


module.exports = Queue;