const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT ||5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api/customers', (req, res) =>{
    res.send(
        [
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
    )
})

app.listen(port, () => console.log(`listening on port ${port}`));