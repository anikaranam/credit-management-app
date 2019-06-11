/*var express = require('express');
var router = express.Router();

/* GET home page. 
router.get('/users', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;*/

var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ravi",
  database: "TSFCM"
});

router.get('/users', function(req, res, next) {
    //res.send('Year is ' + req.query.year);
    //con.connect(function(err) {
	//  if (err) throw err;
	if (!req.query.name) {
		con.query("SELECT * FROM Users", function (err, result, fields) {
			if (err) throw err;
	    	res.send(result);	
		});
	} else {
		con.query("SELECT * FROM Users where Name='" + req.query.name + "'", function (err, result, fields) {
			if (err) throw err;
	    	res.send(result);	
		});	
	}
	//});
	//con.close
});

router.post('/users', function(req, res, next) {
    let sender = req.body["sender"];
    let recipient = req.body["recipient"];
    let amount = req.body["amount"];
    let date = new Date();

    var senderBalance = 0;
    var recipientBalance = 0;

    con.query("INSERT INTO Transfers (Sender, Recipient, Amount, TransactionDate) VALUES('"  + sender + "', '" + recipient + "', " + amount + ", '" + date + "')", 
    		function (error, results, fields) {
        if (error) throw error;
        console.log("results: ");

	    con.query("select Balance from Users where Name = '" + sender + "'", function(err, result, fields){
		    if (err) throw err;
		    
		    senderBalance = result[0].Balance;
		    
		    con.query("select Balance from Users where Name = '" + recipient + "'", function(err, result, fields){
			    if (err) throw err;
			    
			    recipientBalance = result[0].Balance;
			    

			    let senderNewBalance = parseInt(senderBalance, 10) - parseInt(amount, 10);
			    let recipientNewBalance = parseInt(recipientBalance, 10) + parseInt(amount, 10);

			    
			    con.query("update Users set Balance = " + senderNewBalance + " where Name = '" + sender + "'", function(err, result, fields) {
			    	if (err) throw err;
			    	console.log("updated sender");
			    });

			    con.query("update Users set Balance = " + recipientNewBalance + " where Name = '" + recipient + "'", function(err, result, fields) {
			    	if (err) throw err;
			    	console.log("updated recipient");
			    });

			    res.send('ok');

			});
		});
		   	
	});

});

//res.send(JSON.stringify(results));
        /*con.query("SELECT Balance from Users WHERE Name = '" + sender + "'", 
    		function (err, result, fields) {
	        if(error) throw error;
	        console.log("result is " + result);
	        res.send(JSON.stringify(results));
	        //res.send(result);

	    });*/
	    //console.log("select Balance from Users where Name = '" + sender + "'");
		    //console.log(result[0].Balance);
		    /*Object.keys(result).forEach(function(key) {
	      		var row = result[key];
	      		console.log(row.name);
	    	});*/
		

	    //console.log("select Balance from Users where Name = '" + sender + "'");
			    //console.log(result[0].Balance);

	    /*var someVar = {};

		con.query("SELECT Balance from Users WHERE Name = '" + sender + "'", function(err, rows){
		  if(err) {
		    throw err;
		  } else {
		    console.log('hello');
		  }
		});

		/*function setValue(value) {
		  someVar = value;
		  console.log("hello" + someVar);
		}*/





module.exports = router;
