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
// import TextField from '@material-ui/core/TextField'
// import Menu from '@material-ui/core/Menu';

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

import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import ListItemText from '@material-ui/core/ListItemText';
// import Input from '@material-ui/core/Input';
// import MenuItem from '@material-ui/core/MenuItem';
import { observable } from 'mobx'
import { observer } from 'mobx-react'

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
    maxWidth: 64
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

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
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
      searchKeyword: '' // 초기화
    }
  }
  
  stateRefresh = () => {
    this.setState({
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
      searchKeyword: ''
    })
    this.callApi()
      .then(res =>this.setState({customers: res}))
      .then(() => {this.substringDate()})
      .then(()=>{
        window.localStorage.setItem('store', JSON.stringify(this.state.customers))
      })
      .then(()=>{
        this.today()
        this.renderToday()
      })
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20)
    
    this.callApi()
      .then(res =>this.setState({customers: res}))
      .then(() => {this.substringDate()})
      .then(()=>{
        window.localStorage.setItem('store', JSON.stringify(this.state.customers))
      })
      .then(()=>{
        this.today()
        this.renderToday()
      })
  }

  //함수표현식인데
  callApi = async () => {
    const data = await sessionStorage.getItem('id');
    const response = await fetch(`http://ec2-15-164-215-33.ap-northeast-2.compute.amazonaws.com:5000/api/customers/${data}`);
    const body = await response.json();
    return body 
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
      return c.createdDate = c.createdDate.substring(0,10)
    })
  }

  today = () => {
    let current = new Date();
    let yyyy = current.getFullYear();
    let mm = String(current.getMonth()+1).padStart(2,'0')
    let dd = String(current.getDate()).padStart(2,'0');

    this.setState({today:yyyy + '-' + mm + '-' + dd})
  }

  renderToday = () => {
      
      let data = JSON.parse(localStorage.getItem('store'))
      let todayData = data.filter((c)=>{
        // console.log(c)
        return c.createdDate === this.state.today
      })
      
      this.setState({customers: todayData}) 
  }

  prevDay = () => {
    let oneDaysAgo = new Date(); // getMonth() - 월은 0에서부터 시작된다.
    
    this.setState((prevState)=> {
      return {
        score: prevState.score + 1
      }
    });
    this.setState((prevState)=> {
      console.log(prevState.score)
    });
    
    
    // oneDaysAgo.setDate(oneDaysAgo.getDate() - this.state.score); // this.state.score 로 접근햇더니 문제가생겼다..

    // let current = oneDaysAgo;
    // let yyyy = current.getFullYear();
    // let mm = String(current.getMonth()+1).padStart(2,'0')
    // let dd = String(current.getDate()).padStart(2,'0');

    // this.setState((prevState)=> {
    //   return {
    //     today: yyyy + '-' + mm + '-' + dd
    //   }
    // });
    // this.setState(()=>{console.log(this.state.today)})
    // // 이부분을 어떻게 처리해야될지 모르겠다 .. 이전 today 값에서 yyyy-mm-dd 에서 dd를 1만큼 빼줘야되는데 day값만 어떻게빼주지? 이거 mobx로 하면 되는데 아..

    // this.renderToday()
  }

  nextDay = () => {
  }

  reducerDay = () => {
    let data = JSON.parse(localStorage.getItem('store'))
    let total = []

    let price = data.filter((c) => {
      return c.createdDate.substring(0,4).indexOf(this.state.year) > -1 && c.createdDate.substring(5,7).indexOf(this.state.month) > -1 && c.createdDate.substring(8,10).indexOf(this.state.day) > -1; // 체이닝을 활용할것 ..!
    })
    console.log(price)
    price.map((c)=>{
      total.push(c.price)
    })
    this.state.total = total.reduce((acc, cur, i)=> {
      return acc + cur
    },0)

    this.setState({
      show: true
    })
  }

  reducerYear = () => {
    let data = this.state.customers
    let total = []

    // let split = data.map((c)=>{
    //   return c.createdDate.substring(0,4)
    // })
    // console.log(split)

    let price = data.filter((c) => {
      return c.createdDate.substring(0,4).indexOf(this.state.onlyYear) > -1; // 체이닝을 활용할것 ..!
    })
    console.log(price)
    price.map((c)=>{
      total.push(c.price)
    })
    this.state.total = total.reduce((acc, cur, i)=> {
      return acc + cur
    },0)
    this.setState({
      show: false
    })
  }

  render() {

    const filteredComponents = (data) =>{
      data = data.filter((c)=>{
        return c.createdDate.indexOf(this.state.searchKeyword) > -1;
      })
      return data.map((c)=>{
        return <Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} contents={c.contents} phone={c.phone} price={c.price} payment={c.payment} note={c.note} email={c.email} createdDate={c.createdDate}/>
      })
    }

  const {classes} = this.props;
  const cellList = ["번호","이미지","성명","상품내용","전화번호","이메일","금액","결제수단","메모란","날짜","설정"]


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
              placeholder="검색하기"
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
            <IconButton color="inherit">
              <NavigateBeforeIcon onClick={(e) =>{this.prevDay(e)}}/>
            </IconButton>
            <IconButton  color="inherit">
              <NavigateNextIcon onClick={(e) =>{this.nextDay(e)}}/>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
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
          <TableBody>
              <TableRow>
                <TableCell colSpan="11" align="center">
                {/* <FormControl required className={classes.formControl}>
                  <InputLabel htmlFor="onlyYear-native-required">onlyYear</InputLabel>
                  <Select
                    native
                    value={this.state.onlyYear}
                    onChange={this.handleValueChange}
                    name="onlyYear"
                    inputProps={{
                      id: 'onlyYear-native-required',
                    }}
                  >
                    <option value="" />
                    <option value={2019}>2019</option>
                    <option value={2020}>2020</option>
                    <option value={2021}>2021</option>
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
                <Button className={classes.mgr20} variant="contained" color="primary" onClick={this.reducerYear}>
                    연 매출
                </Button> */}
                <FormControl required className={classes.formControl}>
                  <InputLabel htmlFor="year-native-required">year</InputLabel>
                  <Select
                    native
                    value={this.state.year}
                    onChange={this.handleValueChange}
                    name="year"
                    inputProps={{
                      id: 'year-native-required',
                    }}
                  >
                    <option value="" />
                    <option value={2019}>2019</option>
                    <option value={2020}>2020</option>
                    <option value={2021}>2021</option>
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
                <FormControl required className={classes.formControl}>
                  <InputLabel htmlFor="month-native-required">month</InputLabel>
                  <Select
                    native
                    value={this.state.month}
                    onChange={this.handleValueChange}
                    name="month"
                    inputProps={{
                      id: 'month-native-required',
                    }}
                  >
                    <option value="" />
                    <option value={'01'}>01</option>
                    <option value={'02'}>02</option>
                    <option value={'03'}>03</option>
                    <option value={'04'}>04</option>
                    <option value={'05'}>05</option>
                    <option value={'06'}>06</option>
                    <option value={'07'}>07</option>
                    <option value={'08'}>08</option>
                    <option value={'09'}>09</option>
                    <option value={10}>10</option>
                    <option value={11}>11</option>
                    <option value={12}>12</option>
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
                <FormControl required className={classes.formControl}>
                  <InputLabel htmlFor="day-native-required">day</InputLabel>
                  <Select
                    native
                    value={this.state.day}
                    onChange={this.handleValueChange}
                    name="day"
                    inputProps={{
                      id: 'day-native-required',
                    }}
                  >
                    <option value="" />
                    <option value={1}>01</option>
                    <option value={2}>02</option>
                    <option value={3}>03</option>
                    <option value={4}>04</option>
                    <option value={5}>05</option>
                    <option value={6}>06</option>
                    <option value={7}>07</option>
                    <option value={8}>08</option>
                    <option value={9}>09</option>
                    <option value={10}>10</option>
                    <option value={11}>11</option>
                    <option value={12}>12</option>
                    <option value={13}>13</option>
                    <option value={14}>14</option>
                    <option value={15}>15</option>
                    <option value={16}>16</option>
                    <option value={17}>17</option>
                    <option value={18}>18</option>
                    <option value={19}>19</option>
                    <option value={20}>20</option>
                    <option value={21}>21</option>
                    <option value={22}>22</option>
                    <option value={23}>23</option>
                    <option value={24}>24</option>
                    <option value={25}>25</option>
                    <option value={26}>26</option>
                    <option value={27}>27</option>
                    <option value={28}>28</option>
                    <option value={29}>29</option>
                    <option value={30}>30</option>
                    <option value={31}>31</option>
                  </Select>
                  <FormHelperText>Required</FormHelperText>
                </FormControl>
                {/* <TextField className={classes.mgr20} variant="outlined" label="일" type="text" name="day" value={this.state.day} onChange={this.handleValueChange}/> */}
                <Button  className={classes.mgr20} variant="contained" color="primary" onClick={this.reducerDay}>
                    합계
                </Button>
                </TableCell>
                {this.state.today}
                {
                  this.state.show ? <TableCell className={classes.mgr20}>총 매출 : {this.state.total}</TableCell>
                  :  <TableCell className={classes.mgr20}>수단별 매출 구현중 : {this.state.total}</TableCell>
                }
                
              </TableRow>
              </TableBody>
        </Table>
    </Paper>
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
        <TableBody>{
            this.state.customers ? 
              filteredComponents(this.state.customers) : 
            <TableRow>
              <TableCell colSpan="11" align="center">
                <CircularProgress className={classes.progress}  vlaue={this.state.completed} />
              </TableCell>
            </TableRow>
            }</TableBody>
      </Table>
    </Paper>
    
    </div>
  );
}
}

export default withStyles(styles)(App);
