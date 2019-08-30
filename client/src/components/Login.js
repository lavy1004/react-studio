import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


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
        const result = await axios.post('/signin', {
            id: this.state.id,
            password: this.state.password
        })
        
        
        if(result.data.loginresult === true) {
            this.props.onLogin();
            console.log(this.props)
            // this.props.history.push('/');
            const logged = await this.setState({isLogin: true})
            
            const doLogin = await this.doLogin()
            
        } else {
            console.log('???')
        }

    }

    doLogin =  () => {
        const { id, password, isLogin } = this.state;

         window.sessionStorage.setItem('id',id);
         window.sessionStorage.setItem('password',password);
         window.sessionStorage.setItem('isLogin',isLogin);
    } 
    

    render() {
        return (
            <Container>
                {
                this.state.isLogin ? <Redirect to="/App"/> : 
                <form className="form-signin">
                    <h2 className="form-signin-heading"> Please sign in </h2>
                    <label htmlFor="inputId" className="sr-only">ID</label>
                    <input type="text" onChange={this.handleIdChange} id="inputId" className="form-control" placeholder="id" required autoFocus />
                    <label htmlFor="inputPassword" className="sr-only"> Password</label>
                    <input type="password" onChange={this.handlePasswordChange} id="inputPassword" className="form-control" placeholder="Password" required />
                    <button onClick={this.signIn} className="btn btn-lg btn-primary btn-block" type="button"> Sign in
                    </button>
                </form>
                }
                
            </Container>
        )
    }
}

const Container = styled.div`
    display: flex;
    flex-flow: column wrap;
`

export default Login