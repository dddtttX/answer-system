/* 引入express框架 */
const express = require('express');
const app = express();
/* 引入cors */
const cors = require('cors');
const mysql = require('mysql')
var con = mysql.createConnection({
  host: '8.134.149.248',
  user: 'questionsbank',
  password: 'KHADh7bJRD4xXAad',
  port: '3306',
  database: 'questionsbank'
})
con.connect()
const sql = 'select * from questions;'
// con.query(sql, (err, res) => {
//   if (err) {
//     console.log(err)
//     return
//   }
//   console.log(res)
// }
// )
app.use(cors());
/* 引入body-parser */
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', function (req, res, next) {
  if (!req.get('Origin')) return next();
  // use "*" here to accept any origin
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  // res.set('Access-Control-Allow-Max-Age', 3600);
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});


app.get('/', (req, res) => {
  res.send('<p style="color:red">服务已启动</p>');
})

// 查找所有题目（不含答案）
app.get('/api/get_questions_list_no_answer', function (req, res) {
  res.status(200);
  con.query(`SELECT * FROM questions`, function (error, results, fields) {
    if (error)
      throw error;
    res.json(results);
  });
})


// 通过类型查找题目（不含答案）
app.get('/api/get_questions_list_no_answer_by_TYPE', function (req, res) {
  res.status(200);
  con.query(`SELECT * FROM questions as a LEFT JOIN options as b on a.id=b.id where type = ${req.query.type} `, function (error, results, fields) {
    if (error)
      throw error;
    res.json(results);
  });
})

// 通过id查找题目答案
app.get('/api/get_answer_list_by_ID', function (req, res) {
  res.status(200);
  con.query(`SELECT * FROM answer WHERE id = ${req.query.id} ORDER BY answer`, function (error, results, fields) {
    if (error)
      throw error;
  });
})

// app.get('/getOptions', function (req, res) {
//   res.status(200);
//   con.query('SELECT * FROM questions as a LEFT JOIN options as b on a.id=b.id', function (error, results, fields) {
//     if (error)
//       throw error;
//     res.json(results);
//     console.log('results is:', results );
//   });
// });

/* 监听端口 */
app.listen(3001, () => {
  console.log('listen:http://localhost:3001');
})

module.exports = app