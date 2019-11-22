const fs = require('fs')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT ||5000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(cors());

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');


const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
})

connection.connect();

const multer = require('multer')
// const upload = multer({dest: './upload'})


app.get('/', (req, res) => {
    res.send({message: 'hello'})
})

//로그인
app.get('/api/customers/:id', (req, res) =>{
    let sql = 'SELECT * FROM CUSTOMER WHERE is_deleted = 0 AND CUSTOMER.admin_id = ?'
    let params = [req.params.id];
    connection.query(
        sql,
        params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})

// app.use('/image', express.static('./upload'));

//의문점 여기서 서버는 분명 5000port 인데 왜 3000port로 주고 받는건지..  proxy 설정에대해 더 공부할것
//고객 수정
app.put('/api/customers/:id', (req, res)=>{
    let sql = `UPDATE CUSTOMER SET name=?, contents=?, phone=?, email=?, price=?, payment=?,note=?, admin_id=? WHERE customer_seq = ${req.params.id}`;
    let url = 'http://ec2-15-164-215-33.ap-northeast-2.compute.amazonaws.com:5000'
    // let image = req.body.image === 'null'? `${url}/image/default.jpg` : `${url}/image/` + req.file.filename ; // null 이 문자열로 넘어오네.. 이거때매 안됫었네
    let name = req.body.name;
    let contents = req.body.contents;
    let phone = req.body.phone;
    let email = req.body.email;
    let price = req.body.price;
    let payment = req.body.payment;
    let note = req.body.note;
    let admin_id = req.body.admin_id;

    let params = [name, contents, phone, email, price, payment, note, admin_id];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows)
        }
    )
})

//고객 등록
app.post('/api/customers', (req, res)=>{
    let sql = `INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, DATE_FORMAT(NOW(), "%y-%c-%e"), 0)`;
    // let url = 'http://ec2-15-164-215-33.ap-northeast-2.compute.amazonaws.com:5000'
    // let image = req.body.image === 'null'? `${url}/image/default.jpg` : `${url}/image/` + req.file.filename ; // null 이 문자열로 넘어오네.. 이거때매 안됫었네
    console.log(req.body.emailChoice)
    let name = req.body.name;
    let contents = req.body.contents;
    let phone = req.body.phone;
    let email = req.body.email+'@'+req.body.emailChoice;
    let price = req.body.price;
    let payment = req.body.payment;
    let note = req.body.note;
    let admin_id = req.body.admin_id;
    
    let params = [name, contents, phone, email, price, payment, note, admin_id];
    connection.query(sql, params,
        (err, rows, fields)=>{
            res.send(rows)
        }
    )
})

//고객 삭제
app.delete('/api/customers/:id', (req, res) => {
    let sql = 'UPDATE CUSTOMER SET is_deleted = 1 WHERE customer_seq = ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})

app.post('/signin', (req, res) => {
    connection.query("SELECT * FROM ACCOUNT WHERE id=\'"+req.body.id+"\' and password=\'"+req.body.password+"\'", (err, rows) => {
        if(err) throw err;
        
        if(rows.length>0) {
            return res.send({loginresult:true,name:rows[0].NAME,position:rows[0].POSITION});
        } else {
            return res.send({loginresult:false})
        }
    })
})

//회원가입
app.post('/api/signup', (req, res)=>{

    let sql = `INSERT INTO ACCOUNT VALUES (null, ?, ?, ?, ?, ?, ?, ?)`;
    let member_seq = req.body.id;
    let password = req.body.password;
    let name = req.body.name;
    let sex = req.body.sex;
    let birthday = req.body.birthday;
    let email = req.body.email;
    let position = req.body.position;
    let params = [member_seq, password, name, sex, birthday, email, position];
    connection.query(sql, params,
        (err, rows, fields)=>{
            res.send(rows)
        }
    )
})

//
app.get('/api/calculate/:id', (req, res)=>{
    let sql = 'UPDATE CUSTOMER SET created_date WHERE id = ?';
    let params = [req.params.id];

    connection.query(sql, params,
        (err, rows, fields)=>{
            res.send(rows)
            console.log(rows)
        }
    )
})

//serachCalc 정산조회하기
app.get('/api/calculate', (req, res)=>{
    let sql = 'SELECT * FROM CALCULATE WHERE created_date = ? ';
    let selectedDate = req.query.selectedDate

    
    let params = [selectedDate];
    connection.query(sql, params,
        (err, rows, fields)=>{
            res.send(rows)
        }
    )
})

app.post('/api/calculate', (req, res) =>{
    // let sql = 'SELECT * FROM CALCULATE GROUP BY created_date HAVING COUNT(created_date) > 1'
    let sql = `INSERT INTO CALCULATE VALUES (null, ?, ?, ?, ?, ?)`;
    let created_date = req.body.selectedDate
    let spend = req.body.spend
    let balance = req.body.balance
    let take = req.body.take
    let admin_id = req.body.admin_id

    let params = [created_date, spend, balance, take, admin_id];
    connection.query(sql, params,
        (err, rows, fields)=>{
            if(rows.length>0) {
                console.log(rows)
            } else {
                console.log('중복없음')
            }
            
        }
    )
})

app.listen(port, () => console.log(`listening on port ${port}`));