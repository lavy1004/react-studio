import React from 'react';
import CustomerAdd from './CustomerAdd'
import Customer from './Customer'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles} from '@material-ui/core/styles'
import { TableRow } from '@material-ui/core';
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import { post } from 'axios'
import { observer } from 'mobx-react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Button from '@material-ui/core/Button'

// import Menu from '@material-ui/core/Menu';
// import InputLabel from '@material-ui/core/InputLabel';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';


const styles= theme =>({
  root: {
    width: '100%',
    minWidth: 1080,
    marginTop:  8,
  },
  progress: {
    margin: 16
  },
  paper: {
    marginLeft : 18,
    marginRight : 18

  },
  menu: {
    marginTop:15,
    marginBottom:15,
    display:'flex',
    justifyContent:'center'
  },
  tableHead: {
    fontSize:'1.0rem'
  },
  td: {
    maxWidth: 64,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid`,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  mgr20:{
    marginRight: 20
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
})

@observer
class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      selectedDate: '',
      customers: "",
      completed: 0,
      show: false,
      onlyYear:'',
      year:'',
      month:'',
      day:'',
      today: '',
      score:0,
      total:0,
      cash:0,
      card:0,
      account:0,
      position:'',
      spend:'',
      take:'',
      balance:'',
      searchKeyword: '' // 초기화

    }
  }
  
  stateRefresh = () => {
    this.setState({
      selectedDate: '',
      customers: "",
      completed: 0,
      show: false,
      onlyYear:'',
      year:'',
      month:'',
      day:'',
      today: '',
      score:0,
      total:0,
      cash:0,
      card:0,
      account:0,
      position:'',
      spend:'',
      take:'',
      balance:'',
      searchKeyword: ''
    })
    this.callApi()
      .then(res =>this.setState({customers: res}))
      .then(() => {this.substringDate()})
      .then(()=>{
        window.localStorage.setItem('store', JSON.stringify(this.state.customers))
        this.setState({position: window.sessionStorage.getItem('POSITION')})
      })
      .then(()=>{
        this.setDate();
        this.renderToday();
        this.reducerTotal();
      })
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20)

    this.callApi()
      .then(res =>this.setState({customers: res}))
      .then(() => {this.substringDate()})
      .then(()=>{
        window.localStorage.setItem('store', JSON.stringify(this.state.customers))
        this.setState({position: window.sessionStorage.getItem('POSITION')})
      })
      .then(()=>{
        this.setDate();
        this.renderToday();
        this.reducerTotal();
      })
  }
  //함수표현식인데
  callApi = async () => {
    const data = await sessionStorage.getItem('id');
    const response = await fetch(`http://ec2-15-164-215-33.ap-northeast-2.compute.amazonaws.com:5000/api/customers/${data}`);
    const body = await response.json();
    return body 
  }

  handleCalcSubmit = () =>{
    let yyyy = this.state.year
    let mm = this.state.month
    let dd = this.state.day
    const url ='http://ec2-15-164-215-33.ap-northeast-2.compute.amazonaws.com:5000/api/calculate';
    console.log(dd)
    // if(!this.emptyCheck(this.state.year)){
    //   alert('연도를 입력해주세요')
    // } else if (!this.emptyCheck(this.state.month)){
    //   alert('월을 입력해주세요')
    // } else if (!this.emptyCheck(this.state.day)){
    //   alert('일을 입력해주세요')
    // } else {
    //   const params = {
    //     spend: this.state.spend,
    //     take: this.state.take,
    //     balance: this.state.balance,
    //     admin_id: sessionStorage.getItem('id'),
    //     selectedDate: yyyy+'-'+mm+'-'+dd
    //   }

    //   return post(url, params)
    // }
    const params = {
      spend: this.state.spend,
      take: this.state.take,
      balance: this.state.balance,
      admin_id: sessionStorage.getItem('id'),
      selectedDate: yyyy+'-'+mm+'-'+dd
    }

    return post(url, params)
  }

  progress = () => {
    const {completed} = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1})
  }

  handleValueChange = (e) => {
    let nextState = {};
    nextState[e.target.name] = e.target.value;
    this.setState(nextState);
  }
  substringDate = () => {
    let data = this.state.customers

    data.map((c)=>{
      return c.created_date = c.created_date.substring(0,10)
    })
  }


  emptyCheck = ( val ) => {
    if (val === '' || val === null || val === undefined) {
      return false
    } else {
      return true
    }
  }
  // today = () => {
  //   let current = new Date();
  //   let yyyy = current.getFullYear();
  //   let mm = String(current.getMonth()+1).padStart(2,'0')
  //   let dd = String(current.getDate()).padStart(2,'0');

  //   this.setState({today:yyyy + '-' + mm + '-' + dd})
  // }
  setDate = (newDate) => {
    const date = newDate || new Date();
    let yyyy = String(date.getFullYear());
    let mm = String(date.getMonth()+1).padStart(2,'0')
    let dd = String(date.getDate()).padStart(2,'0');


    this.state.selectedDate =  yyyy+'-'+mm+'-'+dd
    this.state.year = yyyy
    this.state.month = mm
    this.state.day = dd
    // this.setState({
    //   selectedDate : yyyy+'-'+mm+'-'+dd,
    //   year: yyyy,
    //   month: mm,
    //   day: dd
    // });
  };

  renderToday = () => {
      
      let data = JSON.parse(localStorage.getItem('store'))
      let todayData = data.filter((c)=>{
        return c.created_date === this.state.selectedDate
      })
      
      this.setState({customers: todayData}) 
  }

  getPreviousDate = () => {

    const currentDayInMilli = new Date(this.state.selectedDate).getTime()
    const oneDay = 1000 * 60 *60 *24
    const previousDayInMilli = currentDayInMilli - oneDay
    const previousDate = new Date(previousDayInMilli)

    this.setDate(previousDate)
    this.renderToday()
    this.searchCalc()
    this.reducerTotal()
  }

  getNextDate = () => {

    const currentDayInMilli = new Date(this.state.selectedDate).getTime()
    const oneDay = 1000 * 60 *60 *24
    const nextDayInMilli = currentDayInMilli + oneDay
    const nextDate = new Date(nextDayInMilli)

    this.setDate(nextDate)
    this.renderToday()
    this.searchCalc()
    this.reducerTotal()
  }

  searchCalc = async () => {
    let yyyy = this.state.year
    let mm = this.state.month
    let dd = this.state.day
    
    let res = await fetch(`http://ec2-15-164-215-33.ap-northeast-2.compute.amazonaws.com:5000/api/calculate?selectedDate=${yyyy+'-'+mm+'-'+dd}`)
    let resData = await res
    let body = await resData.json()
    
    body.map((c)=>{
      this.setState({
        spend:c.spend,
        take:c.take,
        balance:c.balance,
      })
    })
    
  }

  reducerTotal = () => {
    let data = JSON.parse(localStorage.getItem('store'))
    let total = []
    let cash = []
    let card = []
    let account = []
    this.state.card = ''
    this.state.cash = ''
    this.state.account = ''

    // let price = data.filter((c) => {
    //   return c.created_date.substring(0,4).indexOf(this.state.year) > -1 && c.created_date.substring(5,7).indexOf(this.state.month) > -1 && c.created_date.substring(8,10).indexOf(this.state.day) > -1; // 체이닝을 활용할것 ..!
    // })
    let todayPrice = data.filter((c)=>{
      console.log(this.state.day)
      return c.created_date.substring(0,4) === this.state.year && c.created_date.substring(5,7) === this.state.month && c.created_date.substring(8,10) === this.state.day
    })

    console.log(todayPrice)

    todayPrice.filter((c)=>{
        if(c.payment === '현금'){
          cash.push(c.price)
          this.state.cash = cash.reduce((acc, cur, i)=>{
              return acc + cur
          },0)
        } else if (c.payment === '카드'){
          card.push(c.price)
          this.state.card = card.reduce((acc, cur, i)=>{
              return acc + cur
          },0)
        } else if (c.payment === '계좌이체'){
          account.push(c.price)
          this.state.account = account.reduce((acc, cur, i)=>{
              return acc + cur
          },0)
        }       
    })
    
    todayPrice.map((c)=>{
      total.push(c.price)
    })

    this.state.total = total.reduce((acc, cur, i)=> {
      return acc + cur
    },0)

    
    
    this.setState({
      show: true,
    })
  }


  render() {

    const {classes} = this.props;
    const cellList = ["성명","전화번호","이메일","상품내용","금액","결제수단","메모란","날짜","설정"]

    const filteredComponents =  (data) =>{
      if(this.state.searchKeyword) { 
        let data = JSON.parse(localStorage.getItem('store'))

        data = data.filter((c)=>{
          return c.created_date.indexOf(this.state.searchKeyword) > -1 || c.name.indexOf(this.state.searchKeyword) > -1 ;
        })
        return data.map((c)=>{
          return <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.customer_seq} name={c.name} contents={c.contents} phone={c.phone} price={c.price} payment={c.payment} note={c.note} email={c.email} created_date={c.created_date}/>
        })
      } else {
        
        data = data.filter((c)=>{
          return c.created_date.indexOf(this.state.searchKeyword) > -1;
        })
        return data.map((c)=>{
          return <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.customer_seq} name={c.name} contents={c.contents} phone={c.phone} price={c.price} payment={c.payment} note={c.note} email={c.email} created_date={c.created_date}/>
        })
      }
    }

 


  return (
    <div className={classes.root}>
       <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            고객 관리 시스템
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              name="searchKeyword"
              value={this.state.searchKeyword}
              onChange={this.handleValueChange}
            />
          </div>
          <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton
                  aria-label="이전"
                  color="inherit"
                  onClick={this.getPreviousDate}
                >
                  <NavigateBeforeIcon />
              </IconButton>
              <IconButton
                  aria-label="다음"
                  color="inherit"
                  onClick={this.getNextDate}
                >
                  <NavigateNextIcon />
              </IconButton>
              <Link style={{textDecoration: 'none', color:'#fff'}} to='/MyPage'>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              </Link>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-haspopup="true"
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div>
          
        </Toolbar>
      </AppBar>
      <div className={classes.menu}>
        <CustomerAdd stateRefresh={this.stateRefresh}/>
      </div>
      <Paper className={classes.paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {
                cellList.map(c =>{ 
                return <TableCell  key={c.id} className={classes.tableHead}>{c}</TableCell>
                })
              }
            </TableRow>
          </TableHead>
          <TableBody>
              {
              this.state.customers ? 
                filteredComponents(this.state.customers) : 
              <TableRow>
                <TableCell colSpan="11" align="center">
                  <CircularProgress className={classes.progress}  vlaue={this.state.completed} />
                </TableCell>
              </TableRow>
              }
                <TableRow>
                    { this.state.card && this.state.position === 'owner' ? <TableCell style={{fontSize:28,textAlign:'center'}} >카드 : {this.state.card}</TableCell> : ''}
                    { this.state.cash && this.state.position === 'owner' ? <TableCell style={{fontSize:28,textAlign:'center'}}>현금 : {this.state.cash}</TableCell> : ''}
                    { this.state.account && this.state.position === 'owner' ? <TableCell style={{fontSize:28,textAlign:'center'}}>계좌 : {this.state.account}</TableCell> : ''}
                    { this.state.total && this.state.position === 'owner' ? <TableCell style={{fontSize:28,textAlign:'center'}}>총 금액 : {this.state.total}</TableCell> : ''} 
                
                  <TableCell>
                    <TextField  label="지출" type="text" name="spend" value={this.state.spend}  onChange={this.handleValueChange}/>
                  </TableCell>
                  <TableCell>
                    <TextField  label="입금" type="text" name="take" value={this.state.take}  onChange={this.handleValueChange}/>
                  </TableCell>
                  <TableCell>
                    <TextField  label="잔금" type="text" name="balance" value={this.state.balance}  onChange={this.handleValueChange}/>
                  </TableCell>
                  <TableCell>
                    <Button  className={classes.mgr20} variant="contained" color="primary" onClick={this.handleCalcSubmit}>
                      저장
                    </Button>
                  </TableCell>
                </TableRow>
          </TableBody>
        </Table>
      </Paper>
    
    </div>
  );
}
}

export default withStyles(styles)(App);
