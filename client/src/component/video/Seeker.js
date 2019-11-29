import React from 'react'

const percent = (current, total) => {
    return (current / total) * 100
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


  class Timer extends React.Component {
    render() {
      return (
        <div className={this.props.display ? 'timer' : 'timer timer--hide'} style={{ transform: `translateX(${this.props.position - 30}px)` }}>
          {this.props.time}
        </div >
      );
    }
  }
export default Seeker