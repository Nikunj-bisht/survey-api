const { dbsurvey } = require('../dbconnection/userconnnection');

exports.storeanswers = async (req, res) => {


    const { survey_id, ans } = req.body;
    console.log(ans);
    let placeholder;
    placeholder = ans.map(() => "(?,?,?,?)").join(",");
    const query = `insert into answers(survey_id,ques_id,user_id,answer) values` + placeholder;
    console.log(query);
    let arr = [];

    let fi = [];
    for (let i = 0; i < ans.length; i++) {
        console.log(req.user.id);
        let ar = [survey_id, ans[i].ques_id, req.user.id, ans[i].answer];
        console.log(ar);
        arr.push(ar);


    }
    arr.forEach(per => {
        per.forEach((p) => {
            fi.push(p);
        })
    });

    console.log(arr);
    dbsurvey.serialize(function () {
        dbsurvey.run(query, fi, function (err) {

            if (err) {
                console.log(err);
            } else {
                res.status(200).json({
                    status: "succ"
                })
            }

        })

    })



}

exports.getresult = async (req, res) => {
    const { survey_id } = req.body;

    const qu = `select * from answers`;

    await dbsurvey.all(qu, [], function (err, rows) {

        rows.forEach(row => {

            console.log(row);

        })
        console.log('-------');

    });

    const query = `select ques_id,count(distinct answer) as "result" 
                 from (select * from answers where survey_id=${survey_id}) 
                 as t1 group by(t1.ques_id)`;

    const query2 = `select ques_id,answer,count(ans_id) as "final_count" from answers  where survey_id=${survey_id} 
                           and answers.answer = 1 group by(ques_id)   union all select ques_id,answer,count(ans_id) as "final_count" from 
                           answers where survey_id=${survey_id} and answers.answer = 0 group by(ques_id) order by ques_id`;


    dbsurvey.all(query2, [], function (err, rows) {
        let response = [];
        rows.forEach(row => {
            response.push(row);
            console.log(row);

        })

        res.status(200).json({
            status: "success",
            data: response
        })

    });


}
