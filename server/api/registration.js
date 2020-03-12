const express = require("express");
const router = express.Router();
// router.use("/", (req, res, next) => {
//   console.log("user api called");
// });

var database_b = [
    { idBusiness: 0, email:'loi@gmail.com', password: '123abc', BName: 'business', Blocation: '2', OName: 'bob', OSSN: 1234566789, BankAccount: '222222222'}
];
var database_d = [
    { idDriver: 0, email: 'bob@gmail.com', password: 'abc123', DName: 'bob', Dlocation: '1' , DSSN: 123456780, BankAccount:'111111111'}
];

router.get("/", (req, res, next) => {
    res.send("registration page");
});
router.get("/business/", (req, res, next) => {
    res, send("this is page")
    res.send(database_b);
});
router.get("/business/:id", (req, res, next) => {
    let bus = database_b.find(c => c.idBusiness === parseInt(req.params.id));
    if (!bus) // 404
        res.status(404).send('the business with the id was not found');
    res.send(database_b);
});

router.post("/business", (req, res, next) => {
    //Check if all fields are provided and are valid:
    if (!req.body.email.toString.match(/^[a-zA-Z0-9]@[a-zA-Z0-9].[a-zA-Z]$/g) ||
        !req.body.OSSN.toString().match(/^[0-9]{9}$/g)) {

        res.status(400);
        res.json({ message: "Bad Request" });
    } else {
        let id = database.b + 1;
        let email1 = req.body.email;
        let pass = req.body.password;
        let bname = req.body.BName;
        let loc = req.body.Blocation;
        let name = req.body.OName;
        let ssn = req.body.OSSN;
        let acc = req.body.BankAccount;
        let found = database_b.find(c => c.email === (req.params.email));
        if (!found) {
            //inserts
            //var sql = "INSERT INTO business(idBusiness,email,password,BName,Blocation,OName, OSSN,BankAccount) VALUES(?,?,?,?,?,?,?,?)";
            //connection.query(sql, [id, email, pass, name, loc, oname, ssn, bank], function (err, result, fields) {
            //    console.log('inserted');
            //});

            //connection.end();
            let newBusiness = {
                idBusiness: id,
                email: email1,
                password: pass,
                BName: bname,
                Blocation: loc,
                OName: name,
                OSSN: ssn,
                BankAccount: acc
            }
            database_b.push(newBusiness)
            res,send("sent!")
            res.send(database_b)
        }
    }
});

router.get("/driver", (req, res, next) => {
    res.send({ type: "GET" });
});
router.post("/driver", (req, res, next) => {
    //Check if all fields are provided and are valid:
    if (!req.body.email.toString.match(/^[a-zA-Z0-9]@[a-zA-Z0-9].[a-zA-Z]$/g)) {

        res.status(400);
        res.json({ message: "Bad Request" });
    } else { 
        let email = req.body.email;
        let password = req.body.password;
        let bname = req.body.DName;
        let loc = req.body.Dlocation;
        let name = req.body.DName;
        let ssn = req.body.DSSN;
        let acc = req.body.BankAccount;
        if (veritify_d(email) == true) {
            connection.connect(function (err) {
                console.log("Connected!");

            });
            //inserts
            var sql = "INSERT INTO drivers(idDriver,email,password,DName,Dlocation,DSSN,BankAccount) VALUES(?,?,?,?,?,?,?)";
            connection.query(sql, [id, email, pass, name, loc, snn, bank], function (err, result, fields) {
                console.log('inserted');
            });

            connection.end();
        }
    }
});
//query if email exists in database
function veritify_b(arg) {
    let cond = false;

    connection.connect(function (err) {
        console.log("Connected!");

    });

    var sql = "SELECT email FROM business WHERE email = ?";
    connection.query(sql, [arg], function (err, result) {
        if (err) throw err;
        if (result[0].password == pass) {
            console.log('hi');
        }
    });

    connection.end();
    return cond;
}
function veritify_d (arg) {
    let cond = false;

    connection.connect(function (err) {
        console.log("Connected!");

    });

    var sql = "SELECT email FROM drivers HERE email = ?";
    connection.query(sql, [arg], function (err, result) {
        if (err) throw err;
        if (result[0].password == pass) {
            console.log('hi');
        }
    });

    connection.end();
    return cond;
}

module.exports = router;