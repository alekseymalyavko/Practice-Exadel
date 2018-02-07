const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db/logpas.json');
const db = low(adapter);

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/check', function(req, res, next) {
	const db = low(adapter);
    const params = req.body;
    const name = params.name;
    const password = params.password;

    const data = db.find(obj => obj.name === name && obj.password === password).value();
    res.json(data);
});


module.exports = router;
