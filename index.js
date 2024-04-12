var express = require("express");
var app = express();
var mysql = require('mysql');

app.set('view engine', 'ejs'); // Set the template engine 

var bodyParser = require("body-parser") // call body parser module and make use of it
app.use(bodyParser.urlencoded({extended:true}));



// ******************************** Start of SQL **************************************** //
// First we need to tell the application where to find the database
const db = mysql.createConnection({
host: '127.0.0.1',
    user: 'root',
    port: '3306',
    password: 'Root',
    database: 'momin'
 });

// Next we need to create a connection to the database

db.connect((err) =>{
     if(err){
        console.log("go back and check the connection details. Something is wrong.")
    } 
     else{
        console.log('Looking good the database connected')
    }
})


// **********************************  Code from here **************************
app.get('/', function(req,res){
    let sql = 'SELECT * FROM phones';
    let query = db.query(sql, (err,result) => {
        if(err) throw err;
        console.log(result);
        res.render('home', {result})   
    });
    
})


app.get('/add', function(req,res){

    res.render('add')


})


app.post('/add', function(req,res){
    let sql = 'insert into phones ( title, price, model, make, image) values (?, ?, ?, ?, ?)';
    let query = db.query(sql,[req.body.title, req.body.price, req.body.model, req.body.make, req.body.image], (err,result) => {
        if(err) throw err;
        console.log(result);
        res.redirect( '/')   
    });
      
    
})



app.get('/brand/:brand', function(req,res){
    let sql = 'SELECT * FROM phones WHERE brand = ?';
    let query = db.query(sql,[req.params.brand], (err,result) => {
        if(err) throw err;
        console.log(result);
        res.render('brand', {result})   
    });
    
})


app.get('/individual/:id', function(req,res){
    let sql = 'SELECT * FROM phones WHERE id = ?';
    let query = db.query(sql,[req.params.id], (err,result) => {
        if(err) throw err;
        console.log(result);
        res.render('brand', {result})   
    });
    
})


app.use(express.static("views")); 
app.use(express.static("images")); 
app.use(express.static("style")); 


// **********************************  Code to here **************************

app.listen(process.env.PORT || 3300, process.env.IP || "0.0.0.0" , function(){
  console.log("New Full Demo is Live")
});