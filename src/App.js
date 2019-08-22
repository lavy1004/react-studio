import React from 'react';
import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer'

const customers = [
  {
  'id' : 1,
  'image' : 'https://placeimg.com/64/64/any',
  'name' : '기환',
  'birthday' : '920209',
  'gender' : '남',
  'job' : '프론트개발자',
  },
  {
  'id' : 2,
  'image' : 'https://placeimg.com/64/64/any',
  'name' : '홍길동',
  'birthday' : '920209',
  'gender' : '남',
  'job' : '프론트개발자',
  },
  {
  'id' : 3,
  'image' : 'https://placeimg.com/64/64/any',
  'name' : '홍길동',
  'birthday' : '920209',
  'gender' : '남',
  'job' : '프론트개발자',
  },
]

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
