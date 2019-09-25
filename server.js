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
const upload = multer({dest: './upload'})


app.get('/', (req, res) => {
    res.send({message: 'hello'})
})

app.get('/api', (req, res) => {
    res.send({message: 'hello api'})
})

app.get('/api/customers/:id', (req, res) =>{
    let sql = 'SELECT * FROM CUSTOMER WHERE isDeleted = 0 AND CUSTOMER.admin_id = ?'
    let params = [req.params.id];
    connection.query(
        sql,
        params,
        (err, rows, fields) => {
            console.log(rows)
            res.send(rows);
        }
    )
})

app.use('/image', express.static('./upload'));

//의문점 여기서 서버는 분명 5000port 인데 왜 3000port로 주고 받는건지..  proxy 설정에대해 더 공부할것
app.put('/api/customers/:id',upload.single('image'), (req, res)=>{
    console.log(req.params.id)
    let sql = `UPDATE CUSTOMER SET image=?, name=?, contents=?, phone=?, email=?, price=?, payment=?,note=?, admin_id=? WHERE id = ${req.params.id}`;
    let url = 'http://ec2-15-164-215-33.ap-northeast-2.compute.amazonaws.com:5000'
    let image = req.body.image === 'null'? `${url}/image/default.jpg` : `${url}/image/` + req.file.filename ; // null 이 문자열로 넘어오네.. 이거때매 안됫었네
    let name = req.body.name;
    let contents = req.body.contents;
    let phone = req.body.phone;
    let email = req.body.email;
    let price = req.body.price;
    let payment = req.body.payment;
    let note = req.body.note;
    let admin_id = req.body.admin_id;

    let params = [image, name, contents, phone, email, price, payment, note, admin_id];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows)
        }
    )
})
app.post('/api/customers', upload.single('image'), (req, res)=>{
    let sql = `INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, ?, DATE_FORMAT(NOW(), "%y-%c-%e"), 0)`;
    let url = 'http://ec2-15-164-215-33.ap-northeast-2.compute.amazonaws.com:5000'
    let image = req.body.image === 'null'? `${url}/image/default.jpg` : `${url}/image/` + req.file.filename ; // null 이 문자열로 넘어오네.. 이거때매 안됫었네
    let name = req.body.name;
    let contents = req.body.contents;
    let phone = req.body.phone;
    let email = req.body.email;
    let price = req.body.price;
    let payment = req.body.payment;
    let note = req.body.note;
    let admin_id = req.body.admin_id;
    
    let params = [image, name, contents, phone, email, price, payment, note, admin_id];
    connection.query(sql, params,
        (err, rows, fields)=>{
            res.send(rows)
        }
    )
})
app.delete('/api/customers/:id', (req, res) => {
    let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?';
    let params = [req.params.id];
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})

app.post('/signin', (req, res) => {
    connection.query("SELECT * FROM account_info WHERE id=\'"+req.body.id+"\' and password=\'"+req.body.password+"\'", (err, rows) => {
        if(err) throw err;
        
        if(rows.length>0) {
            return res.send({loginresult:true,name:rows[0].NAME,position:rows[0].POSITION});
        } else {
            return res.send({loginresult:false})
        }
    })
})

app.post('/api/signup', (req, res)=>{

    let sql = `INSERT INTO account_info VALUES (null, ?, ?, ?, ?, ?, ?, ?)`;
    let id = req.body.id;
    let password = req.body.password;
    let name = req.body.name;
    let sex = req.body.sex;
    let birthday = req.body.birthday;
    let email = req.body.email;
    let position = req.body.position;
    let params = [id, password, name, sex, birthday, email, position];
    connection.query(sql, params,
        (err, rows, fields)=>{
            res.send(rows)
        }
    )
})

app.listen(port, () => console.log(`listening on port ${port}`));