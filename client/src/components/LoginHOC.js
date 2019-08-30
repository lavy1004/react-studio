import React from 'react';
import Store from '../Store/store';
import LoginContainer from './LoginContainer';

const withLogin = (WrappedComponent) =>
    
class IsLogin extends React.Component {
    render() {
        return (
            <Store.Consumer>
            { store => {
                if(store.logged === false)
                    return <LoginContainer />;
                else
                    return <WrappedComponent />;
            }}
            </Store.Consumer>
        );
    }
};

export default withLogin;