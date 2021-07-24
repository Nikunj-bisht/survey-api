const { dbsurvey } = require('../dbconnection/userconnnection');

exports.fetchallsurveys = async (req, res) => {

    const query = `select * from survey`;
    await dbsurvey.all(query, [], function (err, rows) {

        const surv = [];
        rows.forEach((row) => {

            const obj = {};
            obj.sid = row.survey_id;
            obj.user_id = row.user_id;

            surv.push(obj);
        })

        res.status(200).json({

            data: surv

        })

    });



}


exports.fetchsurveyques = async (req, res) => {
    const { survey_id } = req.body;
    const query = `select * from questions where survey_id = ${survey_id}`;
    let ques = [];
    await dbsurvey.all(query, [], function (err, rows) {

        rows.forEach((row) => {
            let obj = {};

            obj.survey_id = row.survey_id;
            obj.ques_id = row.ques_id;
            obj.ques = row.question
            console.log(row.question,obj.ques_id);
            ques.push(obj);
        })
        res.status(200).json({

            data: ques
        });

    });



}