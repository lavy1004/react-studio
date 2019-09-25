import React from 'react';
import withLogin from './LoginHOC';
import { post } from 'axios'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/styles'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';


class MyPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        id: '',
        password: '',
        passwordConfirm:'',
        name: '',
        sex: '',
        birthday: '',
        email: '',
        open: false,
        position: '',
    }
}

handleClickOpen = () => { // binding 해주어야함 handleClickOpen() {} 이거 안되
        
if(sessionStorage.getItem('id') === null) {
    alert('로그인 후 이용해주세요')
} else {
    const data = sessionStorage.getItem('id');

    this.setState({
        admin_id: data,
        open: true
    })
}


}
handleChange = (event) => {
this.setState({
    payment:event.target.value
});
}


handleClose = () => {
this.setState({
    file: null,
    userName: '',
    contents: '',
    phone: '',
    email: '',
    price: '',
    payment: '',
    note: '',
    admin_id: '',
    fileName: '',
    open: false
})
}

  render () { //classes 이거 왜 render 안에서하는거지
    const {classes} = this.props;
    return (
      <div>
      <Button  variant="contained" color="primary" onClick={this.handleClickOpen}>
          프로필 수정하기 구현중
      </Button>
      <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle> 구현중 </DialogTitle>
          <DialogContent>
            구현중
          </DialogContent>
          <DialogActions>
              <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
              <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
          </DialogActions>
      </Dialog>
  </div>
    );
  }
}

export default withLogin(MyPage);