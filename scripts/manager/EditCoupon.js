// insert http://localhost:3000 into browser address bar
var express = require('express');
var path = require("path");
var bodyParser = require ('body-parser');
var alert = require('alert');
var router = express.Router();
const sql = require('mssql');
const config = require('../../config.js');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname + '../../public')));
router.use('/img', express.static(__dirname + '../../public/Images'));

//Manager: coupon edit
router.post('/', async function(req, res){
    var couponCode = req.body.couponCode;
    var discount = req.body.discount;
   
    console.log('Editing coupon discount with old coupon code: ' + couponCode);
    try {
      await sql.connect(config);
      await sql.query(`UPDATE coupon SET discount = '${discount}' WHERE coupon_code = '${couponCode}';`, function(err){
        if(err){
          alert("Error editing discount of coupon code")
          console.log(err);
        }
        else{
          alert("Coupon code successfully edited");
          console.log("Coupon code successfully edited");
        }
      });
    }
    catch (err) {
      console.error(err);
    }
  });
  module.exports = router;