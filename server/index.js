var express = require('express');
//connects to database and various tables

//router is the login router
const router = express.Router();
//express server
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());



//Initialize route for registration
app.use("/api/registration", require("./api/registration"));
router.use(function (req, res, next) {
    console.log('Time:', Date.now())
    next()
})

//when you have localhost:3000/Login this message shows
router.get('/', function (req, res) {
    res.send("hello this is the login");
    //takes email/password as parameters
});

app.get('/', function (req, res) {
    res.send("hello");
});


app.use('/Login', router);
app.listen(process.env.PORT || '3000', () => console.log('Example app listening on port'))