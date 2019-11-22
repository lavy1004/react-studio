import React from 'react'
import { post } from 'axios'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/styles'
import { green } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';


import TableCell from '@material-ui/core/TableCell';

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';



const styles = theme => ({
    hidden: {
        display: 'none'
    },
    wid100: {
        width: 100 + '%'
    },
    wid02: {
        width: `185px`
    },
    calc02: {
        width: `30%`
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
            userName: '',
            contents: '',
            phone: '',
            email: '',
            emailChoice: '',
            price: '',
            payment: '',
            note: '',
            admin_id: '',
            // fileName: '',
            open: false
        }
    }

    

    handleFormSubmit = (e) => {
        e.preventDefault()
        // const Dialog({ type, ...rest }) => {
        //     switch(type) {
        //         case 'share':
        //             return <ShareDialog {...rest} />;
        //         case 'edit':
        //             return <EditDialog {...rest} />;
        //         case 'delete':
        //             return <DeleteDialog {...rest} />;
        //         default:
        //             return null;
        //     }
        // });
        if(!this.emptyCheck(this.state.userName)) {
            alert('성함을 입력해주세요')
        } else if(!this.emptyCheck(this.state.contents)) {
            alert('상품내용을 입력해주세요')
        } else if (!this.emptyCheck(this.state.payment)) {
            alert('결제수단을 선택해주세요')
        }else {
            this.addCustomer()
            .then((response) => {
               
            this.props.stateRefresh();
            })
            this.setState({
                userName: '',
                contents: '',
                phone: '',
                email: '',
                emailChoice:'',
                price: '',
                payment: '',
                note: '',
                admin_id: '',
                // fileName: '',
                open: false
            })
        }
        
    }
    // handleFileChange = (e) => {
    //     this.setState({
    //         file: e.target.files[0],
    //         fileName: e.target.value
    //     })
    // }
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

    addCustomer = () =>{
        const url ='http://ec2-15-164-215-33.ap-northeast-2.compute.amazonaws.com:5000/api/customers';
        // const formData = new FormData();
        const params = {
            name : this.state.userName,
            contents : this.state.contents,
            phone : this.state.phone,
            email : this.state.email,
            emailChoice: this.state.emailChoice,
            price : this.state.price,
            payment : this.state.payment,
            note : this.state.note,
            admin_id : this.state.admin_id,
        }
        // formData.append('name', this.state.userName)
        // formData.append('contents', this.state.contents)
        // formData.append('phone', this.state.phone)
        // formData.append('email', this.state.email)
        // formData.append('price', this.state.price)
        // formData.append('payment', this.state.payment)
        // formData.append('note', this.state.note)
        // formData.append('admin_id', this.state.admin_id)

        // if( this.state.file === '') {
        //     console.log(this.state.file)
        //     return  
        // } else {
        //     console.log(this.state.file)
        //     return  
        // }
        
    
    
        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // }
        return post(url, params )
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
            userName: '',
            contents: '',
            phone: '',
            email: '',
            emailChoice: '',
            price: '',
            payment: '',
            note: '',
            admin_id: '',
            // fileName: '',
            open: false
        })
    }

    componentDidMount() {
        const data = sessionStorage.getItem('id');
        this.setState({
            admin_id : data
        })
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
                        {/* <input className={classes.hidden} accept="image/*" id="raised-button-file" type='file' file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}/>
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {this.state.fileName === "" ? "프로필이미지선택" : this.state.fileName}
                            </Button>
                        </label> */}
                        <input className={classes.hidden} readOnly id="admin_id" type='text' value={this.state.admin_id} />
                        <TextField className={classes.wid100} required label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}/>
                        <TextField className={classes.wid100} required label="상품내용" type="text" name="contents" value={this.state.contents}  onChange={this.handleValueChange}/>
                        <TextField className={classes.wid100} label="전화번호" type="text" name="phone" value={this.state.phone}  onChange={this.handleValueChange}/>
                        
                        <TextField className={classes.calc02} label="이메일" type="text" name="email" value={this.state.email}  onChange={this.handleValueChange}/>
                        <span style={{ verticalAlign: 'bottom', marginRight:10, marginLeft:10}}>@</span>
                        <TextField className={classes.calc02} label="이메일" type="text" name="emailChoice" value={this.state.emailChoice}  onChange={this.handleValueChange}/>
                        <FormControl required className={classes.formControl}>
                        <InputLabel htmlFor="day-native-required">emailChoice</InputLabel>
                            <Select
                                className={classes.wid02}
                                native
                                value={this.state.emailChoice}
                                onChange={this.handleValueChange}
                                name="emailChoice"
                                inputProps={{
                                    id: 'day-native-required',
                                }}
                            >
                                <option value="" />
                                <option value={''}>직접입력</option>
                                <option value={'naver.com'} selected>naver.com</option>
                                <option value={'hanmail.net'}>hanmail.net</option>
                                <option value={'gmail.com'}>gmail.com</option>
                                <option value={'snu.ac.kr'}>snu.ac.kr</option>
                            </Select>
                        </FormControl>
                        <TextField className={classes.wid100} label="금액" type="text" name="price" value={this.state.price}  onChange={this.handleValueChange}/>
                        <RadioGroup aria-label="position" name="position" required row>
                            <FormControlLabel
                            value="현금"
                            control={<Radio color="primary" />}
                            name="payment"
                            onClick={this.handleValueChangeRdo}
                            label="현금"
                            required
                            />
                            <FormControlLabel
                            value="카드"
                            control={<Radio color="primary" />}
                            name="payment"
                            onClick={this.handleValueChangeRdo}
                            label="카드"
                            required
                            />
                            <FormControlLabel
                            value="계좌이체"
                            control={<Radio color="primary"/>}
                            name="payment"
                            onClick={this.handleValueChangeRdo}
                            label="계좌이체"
                            required
                            />
                        </RadioGroup>
                        {/* <Radio
                            checked={this.state.payment === '이벤트전파가안되서 radio 그룹으로 checked에 문제있음' }
                            onClick={this.handleValueChangeRdo}
                            value="계좌이체"
                            name="payment"
                        />
                         */}
                        <TextField
                            className={classes.wid100}
                            id="filled-multiline-static"
                            label="메모란"
                            multiline
                            rows="4"
                            name="note"
                            value={this.state.note}  
                            onInput={this.handleValueChange}
                            margin="normal"
                            variant="filled"
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