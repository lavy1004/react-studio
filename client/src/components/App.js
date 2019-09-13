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
import TextField from '@material-ui/core/TextField'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button'

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
  }
})




class App extends React.Component{
  
  constructor(props) {
    super(props);
    this.state = {
      customers: "",
      completed: 0,
      show: false,
      month:'',
      day:'',
      total:0,
      searchKeyword: '' // 초기화
    }
  }
  
  stateRefresh = () => {
    this.state = {
      customers: "",
      completed: 0,
      show: false,
      month:'',
      day:'',
      total:0,
      searchKeyword: ''
    }
    this.callApi()
      .then(res =>this.setState({customers: res}))
      .then(() => {this.substringDate()})
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20)
    
    this.callApi()
      .then(res =>this.setState({customers: res}))
      .then(() => {this.substringDate()})
      
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

    let splitDate = data.map((c)=>{
      return c.createdDate = c.createdDate.substring(0,10)
    })
  }

  reducerM = () => {
    let data = this.state.customers
    let total = []

    // let split = data.map((c)=>{
    //   return c.createdDate.substring(5,7)
    // })
    let price = data.filter((c) => {
      return c.createdDate.substring(5,7).indexOf(this.state.month) > -1; // 체이닝을 활용할것 ..!
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
                <TextField className={classes.mgr20} variant="outlined" label="월" type="text" name="month" value={this.state.month} onChange={this.handleValueChange}/>
                <Button className={classes.mgr20} variant="contained" color="primary" onClick={this.reducerM}>
                    월별합계
                </Button>
                {/* <TextField className={classes.mgr20} variant="outlined" label="일" type="text" name="day" value={this.state.day} onChange={this.handleValueChange}/>
                <Button  className={classes.mgr20} variant="contained" color="primary" onClick={this.splitM}>
                    일별합계
                </Button> */}
                </TableCell>
                {/* {
                  this.state.show ? <TableCell className={classes.mgr20}>일별 합계 : {this.state.total}</TableCell>
                  :  <TableCell className={classes.mgr20}>월별 합계 : {this.state.total}</TableCell>
                } */}
                <TableCell className={classes.mgr20}>월별 합계 : {this.state.total}</TableCell>
                
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
              return <TableCell className={classes.tableHead}>{c}</TableCell>
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
