import React from 'react';
import Video from './video/Video'
import videos from '../assets/Clouds.mp4'
import '../assets/video.css'

  class VideoView extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        hotSpots: []
      }
    }
    componentDidMount() {
      this.setState({ hotSpots: [
        {
          "time": "0:10",
          "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industryLorem Ipsum is simply dummy text of the printing and typesetting industry.",
          "thumb": "https://dummyimage.com/200x150/000/fff",
          "name": "AAAA"
        },
        {
          "time": "0:20",
          "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          "thumb": "https://dummyimage.com/200x150/000/fff",
          "name": "BBBBB"
      
        },
        {
          "time": "0:35",
          "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          "thumb": "https://dummyimage.com/200x150/000/fff",
          "name": "CCCCCC"
      
        },
        {
          "time": "0:45",
          "description": "Lorem Ipsum is simply dummy ",
          "thumb": "https://dummyimage.com/200x150/000/fff",
          "name": "DDDDD"
        }
      ]
   });
  }
  
    render() {
      return (
        <div className='VideoView'>
          <Video source={videos} hotSpots={this.state.hotSpots} />
        </div>
      );
    }
  }

  // const convertFormatedTimeToSeconds = (time) => {
  //   return time.split(':').reduce((acc, time) => (60 * acc) + +time);
  // }
  
  // const Star = () => {
  //   return (
  //     <svg className='star' xmlns='http://www.w3.org/2000/svg' viewBox='60 0 121 115' preserveAspectRatio='xMinYMax meet'>
  //      <polygon points='124.635,8.232 139.966,39.295 174.248,44.277 149.442,68.456 155.297,102.598 124.635,86.479   93.974,102.598 99.83,68.456 75.024,44.277 109.306,39.295 '/>
  //     </svg>
  //   )
  // }

  // class ToolTip extends React.Component {
  //   componentDidMount() {
  //     if (this.props.animate) {
  
  //       //little trick to avoid setTimeout to display css animation
  //       requestAnimationFrame(() => {
  //         requestAnimationFrame(() => {
  //           if (this.toolTip) {
  //             this.toolTip.style = `opacity:1;transform: rotate(0deg) translateY(-97%)`;
  //           }
  //         });
  //       });
  //     }
  //   }
  
  //   render() {
  //     return (
  //       <div ref={(toolTip) => { this.toolTip = toolTip; }} className='tool-tip'>
  //         <img className='tool-tip__image' src={this.props.thumb} width={200} height={150} alt="tooltip" />
  //         <p className='tool-tip__description'>{this.props.description}</p>
  //       </div>
  //     );
  //   }
  // }
  //    class HotSpot extends React.Component {
    //   constructor(props) {
    //     super(props);
    
    //     this.state = {
    //       spot: {}
    //     }
    //   }
    
    //   getSpotPosition(time, duration) {
    //     const seconds = convertFormatedTimeToSeconds(time);
    //     return { transform: `translateX(${(percent(seconds, duration) * this.props.containerWidth) / 100}px)` };
    //   }
    
    //   onClick() {
    //     this.props.onClick(this.props.spot);
    //   }
    
    //   onMouseOver(spot) {
    //     this.setState({ spot });
    //   }
    
    //   onMouseLeave() {
    //     this.setState({ spot: {} });
    //   }
    
    //   toolTip() {
    //     let toolTip = null;
    
    //     if (this.state.spot.name) {
    //       toolTip = <ToolTip animate={true} thumb={this.state.spot.thumb} description={this.state.spot.description} />
    //     }
    
    //     return toolTip;
    //   }
    
    //   render() {
    //     return (
    //       <div ref={(spot) => { this.spot = spot; }}
    //         className='hotspot'
    //         onClick={this.onClick.bind(this)}
    //         onMouseLeave={this.onMouseLeave.bind(this)}
    //         onMouseOver={this.onMouseOver.bind(this, this.props.spot)}
    //         style={this.getSpotPosition(this.props.spot.time, this.props.duration)}>
    //         <Star/>
    //         {this.toolTip()}
    //       </div>
    //     );
    //   }
    // }
    
    // class HotSpotList extends React.Component {
    //   render() {
    //     return (
    //       <div className='hotspot-container'>
    //         {
    //           this.props.hotSpots.map((spot, index) => {
    //             return <HotSpot onClick={this.props.onClick.bind(this)} containerWidth={this.props.width} spot={spot} duration={this.props.duration} key={index} />
    //           })
    //         }
    //       </div>
    //     );
    //   }
    // }

export default VideoView