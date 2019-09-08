import React from 'react'
import { post } from 'axios'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/Styles'


const styles = theme => ({
    hidden: {
        display: 'none'
    },
    wid100: {
        width: 100 + '%'
    },
    btn_cent: {
        textAlign: 'center',
        width: 100+'%',
        paddingTop: 20

    }
})

class Join extends React.Component {
    
    
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            password: '',
            name: '',
            sex: '',
            birthday: '',
            email: '',
            open: false
        }
    }

    

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.signUp()
            .then((response) => {
                console.log(response.data)
            })
        this.setState({
            id: '',
            password: '',
            name: '',
            sex: '',
            birthday: '',
            email: '',
            open: false
        })
    }
   
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState)
    }

    signUp = () =>{
        const url ='/api/signup';
        const params = {
            id: this.state.id,
            password: this.state.password,
            name: this.state.name,
            sex: this.state.sex,
            birthday: this.state.birthday,
            email: this.state.email
        }
            
        return post(url, params)
    }

    handleClickOpen = () => { // binding 해주어야함 handleClickOpen() {} 이거 안되
        this.setState({
            open: true
        })
    }

    handleClose = () => {
        this.setState({
            id: '',
            password: '',
            name: '',
            sex: '',
            birthday: '',
            email: '',
            open: false
        })
    }

    render () { //classes 이거 왜 render 안에서하는거지
        const {classes} = this.props;

        return (
            <div className={classes.btn_cent}>
                <Button  variant="contained" color="primary" onClick={this.handleClickOpen}>
                    회원 가입하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle> 회원가입 </DialogTitle>
                    <DialogContent>
                        <TextField className={classes.wid100} label="아이디" type="text" name="id" value={this.state.id} onChange={this.handleValueChange}/>
                        <TextField className={classes.wid100} label="패스워드" type="password" name="password" value={this.state.password}  onChange={this.handleValueChange}/>
                        <TextField className={classes.wid100} label="이름" type="text" name="name" value={this.state.name}  onChange={this.handleValueChange}/>
                        <TextField className={classes.wid100} label="성별" type="text" name="sex" value={this.state.sex}  onChange={this.handleValueChange}/>
                        <TextField className={classes.wid100} label="생년월일" type="text" name="birthday" value={this.state.birthday}  onChange={this.handleValueChange}/>
                        <TextField className={classes.wid100} label="이메일" type="text" name="email" value={this.state.email}  onChange={this.handleValueChange}/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(Join)