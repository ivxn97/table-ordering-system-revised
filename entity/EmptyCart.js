// insert http://localhost:3000 into browser address bar
var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var path = require("path");
var bodyParser = require ('body-parser');
var alert = require('alert');
var router = express.Router();

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname + '../public')));
router.use('/img', express.static(__dirname + '../Images'));

//Administrator: account deletion
router.post('/', function(req, res){
  var username = req.body.username;

  console.log('Emptying Cart...');
  var db = new sqlite3.Database('./restaurant.db');
  db.run('DELETE FROM cart', function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log("Cart Emptied");
    }
  });
});
module.exports = router;