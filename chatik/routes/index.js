const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db/logpas.json')
const db = low(adapter);


var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
  res.render('index');
});

router.post('/signup', function(req, res, next) {
    const params = req.body;

    const currentId = db.value().length+1;

    console.log("length", currentId)

	const new_user = {
        name: params.name,
        password: params.password,
        email: params.email,
        id: currentId.toString(),
        bindingIds: []
    };

    const data = db.push(new_user).write();
    res.json(data);
});

module.exports = router;
