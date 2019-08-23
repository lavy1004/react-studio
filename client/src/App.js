import React from 'react';
import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles'


const styles= theme =>({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  }
})


const customers = [
  {
  'id' : 1,
  'image' : 'https://placeimg.com/64/64/1',
  'name' : '기환',
  'birthday' : '920209',
  'gender' : '남',
  'job' : '프론트개발자',
  },
  {
  'id' : 2,
  'image' : 'https://placeimg.com/64/64/2',
  'name' : '홍길동',
  'birthday' : '920209',
  'gender' : '남',
  'job' : '프론트개발자',
  },
  {
  'id' : 3,
  'image' : 'https://placeimg.com/64/64/3',
  'name' : '홍길동',
  'birthday' : '920209',
  'gender' : '남',
  'job' : '프론트개발자',
  },
]




function App() {
  return (
    <Paper >
    <Table >
      <TableHead>
        <TableCell>번호</TableCell>
        <TableCell>이미지</TableCell>
        <TableCell>이름</TableCell>
        <TableCell>생일</TableCell>
        <TableCell>성별</TableCell>
        <TableCell>직업</TableCell>
      </TableHead>
      <TableBody>
          {
          customers.map(c => {
            return (
              <Customer
                key={c.id}
                id={c.id}
                image={c.image}
                name={c.name}
                birthday={c.birthday}
                gender={c.gender}
                job={c.job}
              />
            )
          })
          }
      </TableBody>
    </Table>
    
    </Paper>
  );
}

export default withStyles(styles)(App);
