/* 引入express框架 */
const express = require('express');
const app = express();
/* 引入cors */
const cors = require('cors');
const mysql = require('mysql')
var con = mysql.createConnection({
  host: '8.134.149.248',
  user: 'questionsbank',
  password: '123456788',
  port: '3306',
  database: 'questionsbank'
})
con.connect()
const sql = 'select * from questions;'
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


//data是要被分组的数据[]，key是分组依据的关键字
function group_data(object, key) {
  let groups = {};
  object.forEach(item => {
    let value = item[key];
    groups[value] = groups[value] || [];
    groups[value].push(item);
  });
  return groups;
}


// 查找所有题目（不含答案）
app.get('/api/get_questions_list_no_answer', function (req, res) {
  res.status(200);
  con.query(`SELECT * FROM questions`, function (error, results, fields) {
    if (error)
      throw error;
    res.json(results);
  });
})

// 查找所有题目选项
app.get('/api/get_options_list', function (req, res) {
  res.status(200);
  con.query(`SELECT * FROM options `, function (error, results, fields) {
    if (error)
      throw error;
    var rts = new Array();
    results.forEach(element => {
      var item = {
        id: element.id,
        options: [element.A, element.B, element.C, element.D],
      };

      rts.push(item);
    });
    res.json(rts);
  })
})

// 通过 type 查找题目（不含答案）
app.get('/api/get_questions_list_no_answer_by_TYPE', function (req, res) {
  res.status(200);
  if (req.query.type == 1 || req.query.type == 0) {
    con.query(`SELECT * FROM questions as a LEFT JOIN options as b on a.id=b.id where type = ${req.query.type} `, function (error, results, fields) {
      if (error)
        throw error;
      res.json(results);
    })
  } else {
    con.query(`SELECT * FROM questions where type = ${req.query.type} `, function (error, results, fields) {
      if (error)
        throw error;
      res.json(results);
    });
  }

})

// 通过 type 查找题目总数
app.get('/api/get_questions_total_count_by_TYPE', function (req, res) {
  res.status(200);
  con.query(`SELECT COUNT (*) FROM questions where type = ${req.query.type} `, function (error, results, fields) {
    if (error)
      throw error;
    res.json(results);
  });
})


// 通过 type 查找题目答案
app.get('/api/get_answer_list_by_TYPE', function (req, res) {
  res.status(200);
  con.query(`SELECT a.id,answer,type FROM answer AS a LEFT JOIN questions as b on a.id = b.id WHERE type = ${req.query.type} ORDER BY a.id,answer`, function (error, results, fields) {
    if (error)
      throw error;

    res.json(group_data(results, "id"));
  });
})

// 通过id查找题目选项
app.get('/api/get_options_list_by_ID', function (req, res) {
  res.status(200);
  con.query(`SELECT * FROM options  WHERE id = ${req.query.id} `, function (error, results, fields) {
    if (error)
      throw error;
    res.json(results[0]);
  });
})

// 更新题目
app.post('/api/update_question_title', function (req, res) {
  var userModSql = 'UPDATE questions SET title = ? WHERE id = ?';
  var userModSql_Params = ['简单说一下闭包？？', 7,];
  //改 up
  con.query(userModSql, userModSql_Params, function (err, result) {
    if (err) {
      console.log('[UPDATE ERROR] - ', err.message);
      return;
    }
    console.log('----------UPDATE-------------');
    console.log('UPDATE affectedRows', result.affectedRows);
    console.log('******************************');
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

// 通过类型查找题目、选项、答案
app.get('/api/get_questions_all_info_list', function (req, res) {
  res.status(200);
  // 先获得选项
  if (req.query.type == 3) {
    con.query((`SELECT * FROM questions WHERE type = ${req.query.type}`), function (error, results, fields) {
      if (error)
        throw error;
      res.json(results);
    })
  }else if(req.query.type == 2 ){
    // return
    con.query((`SELECT * FROM questions as a LEFT JOIN answer as b on a.id = b.id WHERE type = ${req.query.type} ORDER BY a.id `), function (error, results, fields) {
      if (error)
        throw error;
        let newList = []
        results.forEach(item => {
          let newId =  newList.find((i) => i.id == item.id)
          if(!newId){
            newList.push({
              id: item.id,
              title: item.title.split(" "),
              key: item.key,
              type: item.key,
              answers: [item.answer],
              comTitle: item.comTitle
            })
          }else{
            newId.answers.push(item.answer)
          }
        })
        newList.forEach(item => {
          item.answers.reverse()
        })
      res.json(newList);
    })
    
  }else {
    con.query(`SELECT * FROM questions as a LEFT JOIN options as b on a.id = b.id LEFT JOIN answer as c on a.id = c.id where type = ${req.query.type}  ORDER BY a.id,answer`,
      function (error, results, fields) {
        if (error)
          throw error;
        var rts = new Array();
        results.map((element, index) => {
          // if (element.id !== id) {
          var item = {
            id: element.id,
            title: element.title,
            key: element.key,
            type: element.type,
            options: [element.A, element.B, element.C, element.D],
            answer: element.answer
          };
          rts.push(item);
        });
        let newList = []
        rts.forEach(item => {
          let newId = newList.find((i) => i.id == item.id)
          
          if (!newId) {
            newList.push({
              id: item.id, answers: [item.answer],
              title: item.title,
              key: item.key,
              options: item.options,
              type: item.type
            })
          }
          else {
            newId.answers.push(item.answer)
          }
        })
        res.json(newList);

      })
  }
})





/* 监听端口 */
app.listen(8087, () => {
  console.log('listen:http://localhost:8087');
})

module.exports = app