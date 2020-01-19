import React from 'react';
import styled from 'styled-components'
import axios from 'axios'
import { observer } from 'mobx-react';


@observer
class Main extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      help : '',
    }
  }

  getPost = () => {
    return axios.get('http://localhost:5000/data')
  }


  componentDidMount(){
    this.getPost()
    .then((response) => {
      // this.setState({
      //   help: response.data[0]
      // })
      this.state.help = response.data[0]
      console.log(this.state.help.name)
    })
  }

  render() {
      return (
        <div>
          <p>카드 :{this.state.help.name}</p>
        </div>
      );
    }
  }
  
  // const Weather = styled.div`
  //   text-align:center;
  //   margin:0;
  //   width:100%;
  //   background:black;
  //   color:white;
  // `

export default Main;