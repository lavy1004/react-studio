import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
class Header extends React.Component {


    render() {
        const {logged, onLogout} = this.props;

        return (
            <Container>
                <Element>
                    {
                    logged ?
                    <ShortCut><Button variant="contained" color="primary"><Link style={{textDecoration: 'none', color:'#fff'}} to="/" onClick={onLogout}>로그아웃</Link></Button></ShortCut> :
                    <ShortCut>
                        <Card><Button variant="contained" color="primary"><Link style={{textDecoration: 'none', color:'#fff'}} to='/login'>로그인</Link></Button></Card>  
                        <Card><Button variant="contained" color="primary"><Link style={{textDecoration: 'none', color:'#fff'}} to='/join'>회원가입하기</Link></Button></Card>
                    </ShortCut>
                    }
                    <Logo>
                       <Link to="/" style={{textDecoration: 'none', color:'#fff'}}>
                            <img
                            width="100%"
                            height="100%"
                            src="https://placeimg.com/128/128/10"
                            alt="logo"/>
                       </Link>
                    </Logo>
                    <Search><Button variant="outlined" color="secondary" style={{padding: '15px'  ,fontSize: '1.2rem'}}><Link to="/" style={{textDecoration: 'none',color:'gold'}}>Studio LaLa</Link></Button></Search>
                </Element>
            </Container>
        )
    }
} 



export default Header;

const Container = styled.div`
    width: 100%;
    border-bottom: 1px solid #d1d8e4;
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
    width: 128px;
    height: 128px;
`

const Search = styled.div`
    width: calc(100% - 128px);
    order: 3;
    text-align: center;
    height:128px;
    line-height:128px;
`