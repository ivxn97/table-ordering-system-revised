// insert http://localhost:3000 into browser address bar
var express = require('express');
var path = require("path");
var bodyParser = require ('body-parser');
var alert = require('alert');
var router = express.Router();
var cookieParser = require('cookie-parser');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname + '../../public')));
router.use('/img', express.static(__dirname + '../../public/Images'));
router.use(cookieParser());

//Customer: add item to cart
router.post('/', (req, res) => {
  var itemName = req.body.name;
  var itemPrice = req.body.price;
  var quantity = req.body.quantity;

  if (req.cookies.cart == null) {
    const initialData = [{item_name: itemName, quantity: quantity, price: itemPrice}];
    res.cookie('cart', JSON.stringify(initialData));
    console.log(initialData);
    res.redirect('/');
    alert("Item successfully added to cart!");
  }
  else {
    const existingCart = JSON.parse(req.cookies.cart);
    const newData = {item_name: itemName, quantity: quantity, price: itemPrice};
    existingCart.push(newData);
    console.log(existingCart);
    res.cookie('cart', JSON.stringify(existingCart));
    res.redirect('/');
    alert("Item successfully added to cart!");
  }
});
module.exports = router;