import React from 'react'

import videos from '../assets/Clouds.mp4'
import '../assets/video.css'

  const convertFormatedTimeToSeconds = (time) => {
    return time.split(':').reduce((acc, time) => (60 * acc) + +time);
  }
  
  const convertSecondsToHHMMss = (totalSeconds) => {
    const sec_num = parseInt(totalSeconds, 10);
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);
  
    if (hours < 10) { hours = "0" + hours; }
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }
  
    return `${hours}:${minutes}:${seconds}`;
  }
  
  const percent = (current, total) => {
    return (current / total) * 100
  }
  
  class PlayPause extends React.Component {
    onPlayClick() {
      this.props.onClick(true);
    }
  
    onPauseClick() {
      this.props.onClick(false);
    }
  
    render() {
      return (
        <div className='play-pause'>
          <svg onClick={this.onPlayClick.bind(this)} className={`button ${this.props.playing ? 'hide' : ''}`} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 283.5 283.5'>
            <circle cx='141.7' cy='141.7' r='137.5' className='button__bg' />
            <path d='M113.6 78.1L201.8 141.7 113.6 205.4' className='button__icon' />
          </svg>
          <svg onClick={this.onPauseClick.bind(this)} className={`button ${this.props.playing ? '' : 'hide'}`} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 283.5 283.5'>
            <circle cx='141.7' cy='141.7' r='137.5' className='button__bg' />
            <g xmlns="http://www.w3.org/2000/svg"><rect height="120" width="30" x="95" y="85"></rect><rect height="120" width="30" x="150" y="85"></rect></g>
          </svg>
        </div >
      );
    }
  }
  
  class Seeker extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        scale: 0,
        duration: this.props.duration,
        mousePosition: 0,
        display: false,
        time: 0
      }
    }
  
    onClick(evt) {
      this.props.onSeek(percent(evt.nativeEvent.layerX, evt.currentTarget.offsetWidth));
    }
  
    onMouseMove(evt) {
      const percentTime = percent(evt.nativeEvent.layerX, evt.currentTarget.offsetWidth);
      const seconds = (percentTime * this.props.duration) / 100;
  
      this.setState({ display: true, time: convertSecondsToHHMMss(seconds), mousePosition: evt.nativeEvent.layerX, scale: (evt.nativeEvent.layerX / evt.currentTarget.offsetWidth) });
    }
  
    onMouseLeave(evt) {
      this.setState({ scale: 0, display: false });
    }
  
    render() {
      return (
        <div className='seeker' onClick={this.onClick.bind(this)} onMouseLeave={this.onMouseLeave.bind(this)} onMouseMove={this.onMouseMove.bind(this)}>
          <Timer time={this.state.time} display={this.state.display} position={this.state.mousePosition} />
          <div className='seeker__knob' style={{ transform: `translateX(${(this.props.currentPositionPercentual * this.props.width) / 100 - 5}px)` }}></div>
          <div className='seeker__line seeker__line--bg'></div>
          <div className='seeker__line seeker__line--mover' style={{ transform: `scaleX(${this.state.scale})` }}></div>
          <div className='seeker__line seeker__line--current' style={{ transform: `scaleX(${this.props.currentPositionPercentual / 100})` }} ></div>
        </div>
      );
    }
  }
  
  const Star = () => {
    return (
      <svg className='star' xmlns='http://www.w3.org/2000/svg' viewBox='60 0 121 115' preserveAspectRatio='xMinYMax meet'>
       <polygon points='124.635,8.232 139.966,39.295 174.248,44.277 149.442,68.456 155.297,102.598 124.635,86.479   93.974,102.598 99.83,68.456 75.024,44.277 109.306,39.295 '/>
      </svg>
    )
  }
  
  class Timer extends React.Component {
    render() {
      return (
        <div className={this.props.display ? 'timer' : 'timer timer--hide'} style={{ transform: `translateX(${this.props.position - 30}px)` }}>
          {this.props.time}
        </div >
      );
    }
  }

  class Video extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        duration: 0,
        currentPositionPercentual: 0,
        playing: false,
        width: 0
      };
    }
  
    componentDidMount() {
      this.video.controls = false;
  
      this.video.addEventListener('timeupdate', this.onTimeUpdate.bind(this));
  
      this.video.addEventListener('loadedmetadata', this.onLoadMetadata.bind(this));
  
      this.video.addEventListener('seeked', this.onSeeked.bind(this));
  
      window.addEventListener('resize', this.onResize.bind(this));
  
      this.onResize();
    }
  
    onResize() {
      this.setState({ width: document.querySelector('.seeker').offsetWidth });
    }
  
    onLoadMetadata() {
      this.setState({ duration: this.video.duration });
    }
  
    onTimeUpdate() {
      this.setState({ currentPositionPercentual: percent(this.video.currentTime, this.video.duration)});
  
      if (this.video.ended) {
        this.setState({ playing: false, currentPositionPercentual: 0 });
      }
    }
  
    onSeeked() {
      const interval = setTimeout(() => {
        this.setState({ playing: true });
        this.video.play();
  
        this.seeking.classList.remove('seeking-overlay--show');
  
        clearTimeout(interval);
      }, 300);
    }
  
    seekSpot(time) {
      this.seek(percent(convertFormatedTimeToSeconds(time), this.video.duration));
    }
  
    seek(percent) {
      this.setState({ playing: false });
      this.video.pause();
  
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          this.seeking.classList.add('seeking-overlay--show');
        });
      });
  
      const interval = setTimeout(() => {
        this.video.currentTime = (percent * this.video.duration) / 100;
        clearTimeout(interval);
      }, 100);
  
    }
  
    onHotSpotClick(spot, evt) {
      this.seekSpot(spot.time)
    }
  
    onPlayPauseClick(playing) {
      this.setState({ playing: playing });
  
      if (this.state.playing) {
        this.video.pause();
      } else {
        this.video.play();
      }
    }
  
    render() {
      return (
        <div className='player'>
          <div className='video-container'>
            <video className='video' ref={(video) => { this.video = video; }}>
              <source src={this.props.source} type='video/mp4' />
            </video>
            <div ref={(seeking) => { this.seeking = seeking; }} className='seeking-overlay'></div>
            <PlayPause onClick={this.onPlayPauseClick.bind(this)} playing={this.state.playing} />
          </div>
          <Seeker onSeek={this.seek.bind(this)} duration={this.state.duration} width={this.state.width} currentPositionPercentual={this.state.currentPositionPercentual} />
          {/* <HotSpotList hotSpots={this.props.hotSpots} width={this.state.width} onClick={this.onHotSpotClick.bind(this)} duration={this.state.duration} /> */}
        </div>
      );
    }
  }
  
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