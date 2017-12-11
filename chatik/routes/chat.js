const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db/messages.json')
const db = low(adapter);

const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('chat');
});	

router.get('/messages', function(req, res, next) {
  res.json(db);
});

router.post('/messages_delete', function(req, res, next) {
	const params = req.body;
	db.get('messages')
		.remove(params)
		.write();

	const data = db.get('messages').value();
	res.json(data);
});

router.post('/messages_edit', function(req, res, next) {
	const params = req.body;
	const edit_message = {
		letter: params.letter
	};

	db.get('messages').push(edit_message).write();
	const data = db.get('messages').value();
	res.json(data);
});


router.post('/messages_add', function(req, res, next) {
	const params = req.body;
	const new_message = {
		id: params.id,
		letter: params.letter
	};

	db.get('messages').push(new_message).write();
	const data = db.get('messages').value();
	res.json(data);
});


module.exports = router;