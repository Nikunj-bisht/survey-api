const sq = require('sqlite3').verbose();


let db = new sq.Database('./users.db', err => {

    if (err) {
        console.log(err.message);

    } else {
        console.log(`connected with user db`);
    }
    //db.close();
});

let dbsurvey = new sq.Database('./surveys.db', err => {

    if (err) {
        console.log(err.message);

    } else {
        console.log(`connected with survey db`);
    }
    //db.close();
});

module.exports = {

    db, dbsurvey
}