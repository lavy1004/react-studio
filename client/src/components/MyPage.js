import React from 'react';
import withLogin from './LoginHOC';

class MyPage extends React.Component {
  render() {
    return (
        <div>
            MyPage
        </div>
    );
  }
}

export default withLogin(MyPage);