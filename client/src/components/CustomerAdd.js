import React from 'react'
import { post } from 'axios'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/Styles'
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';



const styles = theme => ({
    hidden: {
        display: 'none'
    },
    wid100: {
        width: 100 + '%'
    },
    root: {
    color: green[400],
        '&$checked': {
            color: green[600],
        },
    },
    checked: {},
})

class CustomerAdd extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            file: null,
            userName: '',
            birthday: '',
            
            phone: '',
            email: '',
            price: '',
            payment: '',
            admin_id: '',
            fileName: '',
            open: false
        }
    }

    

    handleFormSubmit = (e) => {
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log(response.data)
            this.props.stateRefresh();
            })
        this.setState({
            file: null,
            userName: '',
            birthday: '',
            
            phone: '',
            email: '',
            price: '',
            payment: '',
            admin_id: '',
            fileName: '',
            open: false
        })
    }
    handleFileChange = (e) => {
        this.setState({
            file: e.target.files[0],
            fileName: e.target.value
        })
    }
    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState)
    }

    handleValueChangeRdo = (e) =>{
        let nextState = {};
        console.log(e.target.value)
        nextState[e.target.name] = e.target.value;
        this.setState(nextState)
    }


    addCustomer = () =>{
        const url ='/api/customers';
        const formData = new FormData();

        formData.append('image', this.state.file)
        formData.append('name', this.state.userName)
        formData.append('birthday', this.state.birthday)
        
        formData.append('phone', this.state.phone)
        formData.append('email', this.state.email)
        formData.append('price', this.state.price)
        formData.append('payment', this.state.payment)
        formData.append('admin_id', this.state.admin_id)
        console.log(formData)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return post(url, formData, config)
    }

    handleClickOpen = () => { // binding 해주어야함 handleClickOpen() {} 이거 안되
        const data = sessionStorage.getItem('id');
        
        this.setState({
            admin_id: data,
            open: true
        })

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
            birthday: '',
            
            phone: '',
            email: '',
            price: '',
            payment: '',
            admin_id: '',
            fileName: '',
            open: false
        })
    }

    componentDidMount() {
        const data = sessionStorage.getItem('id');
        this.setState({
            admin_id : data
        })
        console.log(data)
    }

    render () { //classes 이거 왜 render 안에서하는거지
        const {classes} = this.props;

        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    고객 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle> 고객 추가 </DialogTitle>
                    <DialogContent>
                        <input className={classes.hidden} accept="image/*" id="raised-button-file" type='file' file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "프로필이미지선택" : this.state.fileName}
                            </Button>
                        </label>
                        <input className={classes.hidden} id="admin_id" type='text' value={this.state.admin_id} />
                        <TextField className={classes.wid100} label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/>
                        <TextField className={classes.wid100} label="생년월일" type="text" name="birthday" value={this.state.birthday}  onChange={this.handleValueChange}/>
                        <TextField className={classes.wid100} label="전화번호" type="text" name="phone" value={this.state.phone}  onChange={this.handleValueChange}/>
                        <TextField className={classes.wid100} label="이메일" type="text" name="email" value={this.state.email}  onChange={this.handleValueChange}/>
                        <TextField className={classes.wid100} label="금액" type="text" name="price" value={this.state.price}  onChange={this.handleValueChange}/>
                        <label htmlFor="payment">
                            현금
                        </label>
                        <Radio
                            checked={this.state.payment === '현금'}
                            onChange={this.handleValueChangeRdo}
                            value="현금"
                            name="payment"
                            inputProps={{ 'aria-label': 'A' }}
                        />
                        <label htmlFor="payment">
                            카드
                        </label>
                        <Radio
                            checked={this.state.payment === '카드'}
                            onChange={this.handleValueChangeRdo}
                            value="카드"
                            name="payment"
                            inputProps={{ 'aria-label': 'B' }}
                        />
                        <label htmlFor="payment">
                            계좌이체
                        </label>
                        <Radio
                            checked={this.state.payment === '계좌이체'}
                            onChange={this.handleValueChangeRdo}
                            value="계좌이체"
                            name="payment"
                            inputProps={{ 'aria-label': 'B' }}
                        />
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

export default withStyles(styles)(CustomerAdd)