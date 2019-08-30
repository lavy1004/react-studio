import React from 'react';
import styled from 'styled-components'

const API_KEY = 'd144a6a3d319cebf69f1478e5e0c7ab5';

class Main extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      lat: 0,
      long: 0,
      temperature: 0,
      name: '',
      icon: '',
    }
  }
//   getPosition = () => {

//     const options = {
//       timeout: 10000,
//       enableHighAccuracy: true,
//       maximumAge: 0
//     };

//     if(navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         this.setState({
//           lat: position.coords.latitude,
//           long: position.coords.longitude
//         });
//       },(error) => {
//         console.log(error)
//       },options);
//     }

//     this.getWeather();
//   }

  getWeather = () => {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=Seoul&APPID=${API_KEY}`)
    .then(response => response.json())
    .then(json => {
      this.setState({
        temperature: Math.floor(json.main.temp - 273.15),
        name: json.weather[0].main,
        icon: json.weather[0].icon,
      });
    });
  }

  componentDidMount() {
    this.getWeather()
  }

  render() {
      const { temperature, name, icon } = this.state;
      const img_url = `http://openweathermap.org/img/w/${icon}.png`;

      return (
        <Weather>
          <h1>오늘의 날씨</h1>
          <img alt="weather_icon" src={img_url}/>
          <h3>온도 : {temperature}°C</h3>
          <h3>날씨 : {name}</h3>
        </Weather>
      );
    }
  }
  
  const Weather = styled.div`
    text-align:center;
    margin:0 auto;
  `

export default Main;