import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

class Header extends React.Component {


    render() {
        const {logged, onLogout} = this.props;

        return (
            <Container>
                <Element>
                    {
                    logged ?
                    <ShortCut><Link to="/" onClick={onLogout}>로그아웃</Link></ShortCut> :
                    <ShortCut><Link to="/login">로그인</Link></ShortCut> 
                    }
                    <Logo>
                       <Link to="/" style={{textDecoration: 'none', color:'#274046'}}>
                            <img
                            width="100%"
                            height="100%"
                            src="https://placeimg.com/128/128/10"
                            alt="logo"/>
                       </Link>
                    </Logo>
                <Search>Studio LaLa</Search>
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