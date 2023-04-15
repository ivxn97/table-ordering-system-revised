// insert http://localhost:3000 into browser address bar
var express = require('express');
var path = require("path");
var bodyParser = require ('body-parser');
var router = express.Router();
const sql = require('mssql');
const config = require('../../config.js');
var cookieParser = require('cookie-parser');
const url = require('url');
const querystring = require('querystring');

router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(express.static(path.join(__dirname + '../../public')));
router.use('/img', express.static(__dirname + '../../public/Images'));
router.use(cookieParser());

// Render Menu
router.get('/', async (req, res) => {
    const parseURL = url.parse(req.url, true);
    const query = querystring.parse(parseURL.query);
    const tableNumber = query.table_number;
    
    try {
        await sql.connect(config);
        await sql.query("SELECT * FROM foodmenu", async (error, rows1) => {
            await sql.query("SELECT * FROM drinkmenu", (error, rows2) => {
                if (error){
                    console.log(error);
                }
                res.render('menuPage', {foodmenu: rows1.recordset, drinkmenu: rows2.recordset});
        })});
    }
    catch (err) {
        console.error(err);
    }
  });
  module.exports = router;