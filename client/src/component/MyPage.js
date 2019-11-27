import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { withStyles} from '@material-ui/core/styles'
import DaysOfMonth from './DaysOfMonth'
import DaysOfWeek from './DaysOfWeek'
import Counter from './Counter'
import ReactFlowPlayer from "react-flow-player";
import VideoView from "./VideoView";
import Axios, { get } from "axios"
import videos from '../assets/Clouds.mp4'



import '../assets/style.css'


const styles= theme =>({
  Calendar: {
    width: '100%',
    minWidth: 1080,
    marginTop:  8,
  },
})

const Year = 2019

const Months = [
  { id: 0, name: "January", numberOfDays: 31},
  { id: 1, name: "February", numberOfDays: 28},
  { id: 2, name: "March", numberOfDays: 31},
  { id: 3, name: "April", numberOfDays: 30},
  { id: 4, name: "May", numberOfDays: 31},
  { id: 5, name: "June", numberOfDays: 30},
  { id: 6, name: "July", numberOfDays: 31},
  { id: 7, name: "August", numberOfDays: 31},
  { id: 8, name: "September", numberOfDays: 30},
  { id: 9, name: "October", numberOfDays: 31},
  { id: 10, name: "November", numberOfDays: 30},
  { id: 11, name: "December", numberOfDays: 31}
];

@observer
class MyPage extends Component {
  constructor() {
    super();
    this.state = {
      activeMonthIndex: 0,
      calcList: []
    };
    this.updateMonthView = this.updateMonthView.bind(this);
  }



  drawMonthSelector() {
    let buttonCollection = [];
    let counter = 0;

    Months.map(month => {
      const monthIndex = counter;
      buttonCollection.push(
        <option value={monthIndex}>
          {month.name}
        </option>
      );
      counter++;
    });

    return (
      <select onChange={(e) => this.updateMonthView(e)} className="month-selector">
        {buttonCollection}
      </select>
    );
  }

  updateMonthView(event) {
    this.setState({ activeMonthIndex: event.target.value });
  }

  componentDidMount() {
    this.callApi()
        .then(res => console.log(res))
  }
  
  callApi = async () => {
    const data = await sessionStorage.getItem('id');
    const response = await Axios.get(`http://ec2-15-164-215-33.ap-northeast-2.compute.amazonaws.com:5000/api/calculate/${data}`)

    return response 
  }

  render() {

    const {classes} = this.props;

    return (
      <div id="Calendar">        
        <h1>
        {Months[this.state.activeMonthIndex].name} {Year}
        </h1>
        {this.drawMonthSelector()}
          <DaysOfWeek />
          <DaysOfMonth
            monthData={Months[this.state.activeMonthIndex]} year={Year}
          />
          <br/>
          <Counter />
          <VideoView />
          
          <ReactFlowPlayer
              playerInitScript="http://releases.flowplayer.org/7.2.1/flowplayer.min.js"
              playerId="reactFlowPlayer"
              sources={[
                {
                  type: "video/webm",
                  src: videos
                }
              ]}
              customButton={[
                {
                  component: <a id="custom-btn">Custom React Component</a>,
                  class: "fp-controls > .fp-volume",
                  id: "custom-btn",
                  place: "before"
                }
              ]}
            />
      </div>
    );
  }
}



export default withStyles(styles)(MyPage);