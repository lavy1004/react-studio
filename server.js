const fs = require('fs')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT ||5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

// const passportConfig = require('./passport.js');

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

app.get('/api/customers/:id', (req, res) =>{
    let sql = 'SELECT * FROM CUSTOMER WHERE isDeleted = 0 AND CUSTOMER.admin_id = ?'
    let params = [req.params.id];
    connection.query(
        sql,
        params,
        (err, rows, fields) => {
            res.send(rows);
        }
    )
})

app.use('/image', express.static('./upload'));
//의문점 여기서 서버는 분명 5000port 인데 왜 3000port로 주고 받는건지.. 
app.post('/api/customers', upload.single('image'), (req, res)=>{
    let sql = `INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, ?, ?, ?, now(), 0)`;
    let image = req.body.image === 'null'? '/image/default.jpg' : '/image/' + req.file.filename ; // null 이 문자열로 넘어오네.. 이거때매 안됫었네
    let name = req.body.name;
    let birthday = req.body.birthday;
    let phone = req.body.phone;
    let email = req.body.email;
    let price = req.body.price;
    let payment = req.body.payment;
    let admin_id = req.body.admin_id;
    
    let params = [image, name, birthday, phone, email, price, payment, admin_id];
    console.log(params)
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
            return res.send({loginresult:true,name:rows[0].name});
        } else {
            return res.send({loginresult:false})
        }
    })
})

app.post('/api/signup', (req, res)=>{

    let sql = `INSERT INTO account_info VALUES (null, ?, ?, ?, ?, ?, ?)`;
    let id = req.body.id;
    let password = req.body.password;
    let name = req.body.name;
    let sex = req.body.sex;
    let birthday = req.body.birthday;
    let email = req.body.email;
    let params = [id, password, name, sex, birthday, email];
    connection.query(sql, params,
        (err, rows, fields)=>{
            res.send(rows)
        }
    )
})

app.listen(port, () => console.log(`listening on port ${port}`));