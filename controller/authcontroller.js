//const kconnect = require('../dbconnection/userconnnection');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcryt = require('bcryptjs');
const {promisify} = require('util');
const {db} = require('../dbconnection/userconnnection');

function gettoken(userid) {

  const token = jwt.sign({ id: userid }, process.env.jwt_token, { expiresIn: process.env.token_expire });
  return token;

}

exports.signup = async (req, res) => {
  console.log(req.body);
  let { username, password } = req.body;
  password = await bcryt.hash(password, 12);
  await db.run(`insert into "users"(username,password) values(?,?)`, [username, password], function (err) {

    if (err) {
      console.info(err.message);
      res.status(200).json({

        status: "not success"

      });
    } else {

      console.log("data inserted successfully", this.lastID);
      const jwt_token = gettoken(this.lastID);
      res.status(200).json({

        status: "signedup successfully!",
        token: jwt_token

      });

    }

  });



}

exports.login = async (req, res) => {

  const { username, password } = req.body;
  const query = `select * from users where username='${username}'`;
  db.get(query, [], (err, row) => {

    if (err) {
      console.log(err);
      res.status(500).json({
        status: "server error try again"
      })
    } else {


      console.log(password, row.password);
      bcryt.compare(password, row.password, function (err, result) {

        if (err) {
          console.log(err);
        }

        if (!result) {

          res.status(200).json({
            status: "wrong credentials!"
          })
          return;
        }
        const jwt_token = gettoken(row.id);
        res.status(200).json({
          status: "Logged in successfully!!",
          token: jwt_token
        })


      });

    }

  })


}

exports.protect = async (req, res,next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  console.log(token);
  if (!token) {
    res.status(200).json({
      status: "Token expired kindly login again!"
    })
    return;
  }
// const decode = await promisify(jwt.verify)(token,process.env.jwt_token);
const decode = await jwt.verify(token,process.env.jwt_token);
let id = decode.id;
const query = `select * from users where id=${id}`;
await db.get(query,[],(err,row)=>{

if(err){

  return;
}
const user = {id:row.id,username:row.username};
req.user = user;
console.log(row.username,row.id);
next();


})





}




// Testing 

exports.create = (req, res) => {

  db.run('create table  users (id integer PRIMARY KEY AUTOINCREMENT,username text , password text)');


}

exports.fetchall = async (req, res) => {

  db.all(`select * from users`, [], (err, rows) => {

    if (err) {

    } else {
      rows.forEach(row => {
        console.log(row.id, row.username, row.password);
      })
    }

  })

}


exports.delete = async (req, res) => {

  db.run('delete from  users');

}



