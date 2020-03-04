
/**
 * Require express and mysql to connect to the database and ejs files
 */
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 5000;


// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, '/'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload

// routes for the app

/**
 * The route used when first open the browser
 * It renders the connection form template
 */
app.get('/',function(req,res){
    res.render('Connection.ejs',{})
  });


/**
 * The route used to achieve the entered data
 * It takes the user's data and used it to connect to the database
 */
app.post('/connect',function(req,res){
    let myhost = req.body.host
    let myuser = req.body.user
    let mypass = req.body.password
    let myport = req.body.port
    let mydatabase = req.body.database
    const db = mysql.createConnection ({
        host: myhost,
        user: myuser,
        password: mypass,
        port: myport,
        database: mydatabase
    });
    
    // connect to database
    db.connect((err) => {
        if (err) {
            throw err;
        }
        console.log('Connected to database');
    });
    global.db = db;
    res.render('HomePage.ejs',{})
})

// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});