import React from 'react'
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
            passwordConfirm:'',
            name: '',
            sex: '',
            birthday: '',
            email: '',
            open: false,
            position: '',
        }
    }

    

    handleFormSubmit = (e) => {
        e.preventDefault()
        if(!this.emptyCheck(this.state.id)) {
            alert('아이디를 입력해주세요')
        } else if(!this.emptyCheck(this.state.password)) {
            alert('비밀번호를 입력해주세요')
        } else if (!this.emptyCheck(this.state.position)) {
            alert('직급을 선택해주세요')
        } else if (this.state.password !== this.state.passwordConfirm) {
            alert('비밀번호가 동일하지않습니다')
        } else {
            alert('회원가입이 완료되었습니다')
            this.signUp()
            .then((response) => {
                console.log(response.data)
            })
            this.setState({
            id: '',
            password: '',
            passwordConfirm:'',
            name: '',
            sex: '',
            birthday: '',
            email: '',
            open: false,
            position: ''
        })
        }
        
    }
   
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState)
    }

    handleValueChangeRdo = (e) =>{
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState)
    }

    emptyCheck = ( val ) => {
        if (val === '' || val === null || val === undefined) {
          return false
        } else {
          return true
        }
    }

    signUp = () =>{
        const url ='http://ec2-54-180-113-217.ap-northeast-2.compute.amazonaws.com:5000/api/signup';
        const params = {
            id: this.state.id,
            password: this.state.password,
            name: this.state.name,
            sex: this.state.sex,
            birthday: this.state.birthday,
            email: this.state.email,
            position: this.state.position
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
            open: false,
            position:''
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
                        <TextField className={classes.wid100} required label="아이디" type="text" name="id" value={this.state.id} onChange={this.handleValueChange}/>
                        <TextField className={classes.wid100} required label="패스워드" type="password" name="password" value={this.state.password}  onChange={this.handleValueChange}/>
                        <TextField className={classes.wid100} required label="패스워드 확인" type="password" name="passwordConfirm" value={this.state.passwordConfirm}  onChange={this.handleValueChange}/>
                        <TextField className={classes.wid100} label="이름" type="text" name="name" value={this.state.name}  onChange={this.handleValueChange}/>
                        <TextField className={classes.wid100} label="생년월일" placeholder="앞6자리만 입력해주세요(920209)" type="text" name="birthday" value={this.state.birthday}  onChange={this.handleValueChange}/>
                        <TextField className={classes.wid100} label="이메일" type="text" name="email" value={this.state.email}  onChange={this.handleValueChange}/>
                        <RadioGroup aria-label="position" name="sex" required row>
                            <FormLabel style={{ height: 42+'px', lineHeight: 42+'px',marginRight: 30+'px'}} component="legend">성별</FormLabel>
                            <FormControlLabel
                            value="남"
                            control={<Radio color="primary" />}
                            name="sex"
                            onClick={this.handleValueChangeRdo}
                            label="남자"
                            required
                            />
                            <FormControlLabel
                            value="녀"
                            control={<Radio color="primary" />}
                            name="sex"
                            onClick={this.handleValueChangeRdo}
                            label="여자"
                            required
                            />
                        </RadioGroup>
                        <RadioGroup aria-label="position" name="position" required row>
                            <FormLabel style={{ height: 42+'px', lineHeight: 42+'px',marginRight: 30+'px'}} component="legend">직급</FormLabel>
                            <FormControlLabel
                            value="owner"
                            control={<Radio color="primary" />}
                            name="position"
                            onClick={this.handleValueChangeRdo}
                            label="관리자"
                            required
                            />
                            <FormControlLabel
                            value="employee"
                            control={<Radio color="primary" />}
                            name="position"
                            onClick={this.handleValueChangeRdo}
                            label="사원"
                            required
                            />
                        </RadioGroup>
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