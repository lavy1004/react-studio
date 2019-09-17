import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.handleIdChange = this.handleIdChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.state = {
          id:'',
          password:'',
          isLogin: false
        };
    }

    handleIdChange(e){
        this.setState({id:e.target.value})
    }
    handlePasswordChange(e){
        this.setState({password:e.target.value})
    }

    signIn = async () =>{          
        const result = await axios.post('http://ec2-15-164-215-33.ap-northeast-2.compute.amazonaws.com:5000/signin', {
            id: this.state.id,
            password: this.state.password
        })
        
        
        if(result.data.loginresult === true) { // 서버에서 로그인한지 않한지 알려주는 값으로 올려주는값
            this.props.onLogin();
            // this.props.history.push('/');
            const logged = await this.setState({isLogin: true})
            
            const doLogin = await this.doLogin()
            
        } else {
            alert('가입된 아이디가 없습니다 회원가입을 해주세요')
        }

    }

    doLogin =  () => {
        const { id, isLogin } = this.state;

         window.sessionStorage.setItem('id',id);
        //  window.sessionStorage.setItem('password',password);
         window.sessionStorage.setItem('isLogin',isLogin);
    } 
    

    render() {
        return (
            <Container>
                {
                this.state.isLogin ? <Redirect to="/"/> : 
                <form className="form-signin">
                    <h2 className="form-signin-heading"> Login </h2>
                    <Card>
                        <TextField variant="outlined" label="ID" type="text" onChange={this.handleIdChange} id="inputId" className="form-control" placeholder="id" required autoFocus />
                    </Card>
                    <Card><TextField variant="outlined" label="Password" type="password" onChange={this.handlePasswordChange} id="inputPassword" className="form-control" placeholder="Password" required /></Card>
                    <Card2>
                        <Button onClick={this.signIn}   variant="contained" color="primary" type="button"> Login
                        </Button>
                    </Card2>
                </form>
                }
                
            </Container>
        )
    }
}

const Container = styled.div`
    display: flex;
    flex-flow: column wrap;
    margin:0 auto;
`
const Card = styled.div`
    width:100%;
    padding:10px;
`
const Card2 = styled.div`
    text-align:center;
    padding:10px;
`

export default Login