import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import logo from '../assets/logo.png';
class Header extends React.Component {


    render() {
        const {logged, onLogout} = this.props;

        return (
            <Container>
                <Element>
                    
                    <Logo>
                       <Link to="/" style={{textDecoration: 'none', color:'#fff'}}>
                            <img
                            width="100%"
                            src={logo}
                            alt="logo"/>
                       </Link>
                    </Logo>
                    {
                    logged ?
                    <ShortCut>
                        <Card><Link style={{textDecoration: 'none', color:'#fff'}} to='/app'><Button variant="contained" color="primary">Test</Button></Link></Card>
                        <Card><Link style={{textDecoration: 'none', color:'#fff'}} to="/" onClick={onLogout}><Button variant="contained" color="primary">로그아웃</Button></Link></Card>
                    </ShortCut> :
                    <ShortCut>
                        <Card><Link style={{textDecoration: 'none', color:'#fff'}} to='/app'><Button variant="contained" color="primary">Test</Button></Link></Card>
                        <Card><Link style={{textDecoration: 'none', color:'#fff'}} to='/login'><Button variant="contained" color="primary">로그인</Button></Link></Card>  
                        <Card><Link style={{textDecoration: 'none', color:'#fff'}} to='/join'><Button variant="contained" color="primary">회원가입하기</Button></Link></Card>
                    </ShortCut>
                    }
                </Element>
            </Container>
        )
    }
} 



export default Header;

const Container = styled.div`
    width: 100%;
    margin-top:20px;
`
const Card = styled.div`
    display:inline-block;    
margin-right:10px;
`

const Element = styled.div`
    margin: 0 auto;
    display: flex;
    flex-flow: row wrap;
`

const ShortCut = styled.div`
    order: 1;
    width: 100%;
    height: 20px;
    text-align: right;
`

const Logo = styled.div`
    order: 2;
    order: 2;
    width: 150px;
    margin-left: 20px;
    margin-top: -20px;
    height: 128px;
`
