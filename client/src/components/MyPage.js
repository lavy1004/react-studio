// components/UserView.js
import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('store')
@observer
class MyPage extends Component {
  render() {
    const { userInfo } = this.props.store.UserStore;

    return (
      <div>
        이름 : {userInfo ? userInfo.name : ''}
      </div>
    );
  }
}

export default MyPage;