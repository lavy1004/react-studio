import React from 'react';
import withLogin from './LoginHOC';

class MyBoard extends React.Component {
  render() {
    return (
        <div>
            내 글보기
        </div>
    );
  }
}

export default withLogin(MyBoard);