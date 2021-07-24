const { db, dbsurvey } = require('../dbconnection/userconnnection');
const factoryfun = require('../factoryfunctions/fetchsurandques');
const answersfac = require('../factoryfunctions/saveanstodb');

exports.createsurvey = async (req, res) => {

    let ques = req.body.questions;
    console.log(ques);

    // let holder = ques.map(q => '(?,?)').join(',');
    //let data = ques.map(q=>q.ques);
    dbsurvey.run(`insert into survey(user_id,user_name) values(?,?)`, [req.user.id, req.user.username], function (err) {
        let s_id;
        if (err) {
            console.log(err);
            return;
        } else {
            s_id = this.lastID;
            console.log("inserted success", this.lastID);
            console.log("Inserting ques");


        }

        const q_query = `insert into questions(survey_id,question) values(?,?)`;
        let statement = dbsurvey.prepare(q_query);
        for (let i = 0; i < ques.length; i++) {

            let arr = [s_id, ques[i].ques];
            statement.run(arr, function (err) {
                console.log(i, " ques inserted");
            });
        }



    });


}

exports.fetchallsurveys = factoryfun.fetchallsurveys;

exports.fetchquestions = factoryfun.fetchsurveyques;

exports.saveanwers =  answersfac.storeanswers;

exports.getresult = answersfac.getresult;

// Testing

exports.surveytable = async (req, res) => {

    // const query = `create table survey(survey_id integer PRIMARY KEY AUTOINCREMENT 
    //                  , user_id int NOT NULL, user_name text NOT NULL)`


    // const query = `create table questions(ques_id integer PRIMARY KEY AUTOINCREMENT 
    //                  , survey_id int NOT NULL, question text NOT NULL)`
    // const query = `create table questions(ques_id integer PRIMARY KEY AUTOINCREMENT 
    //                  , survey_id int NOT NULL, question text NOT NULL)`



    
    // console.log('created');
  //  const query = `drop table answers`;
     const query = `create table answers(ans_id integer PRIMARY KEY AUTOINCREMENT ,
                    survey_id int NOT NULL , ques_id int NOT NULL , user_id int NOT NULL , answer boolean NOT NULL)`
                 dbsurvey.run(query);
console.log("created");
    // const query = `select * from questions`;

    // dbsurvey.all(query,[],function(err,rows){

    //     rows.forEach(row=>{
    //         console.log(row.question , row.survey_id);
    //     })
    // })
}


