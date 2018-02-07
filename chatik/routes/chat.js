const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const messages = new FileSync('db/messages.json');
const db = low(messages);

const login = new FileSync('db/logpas.json');

const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('chat');
});

router.get('/messages', function(req, res, next) {
    res.json(db);
});


router.post('/find_friends', function(req, res, next) {
    const db_l = low(login);
    const params = req.body;
    const user = params.user;
    const resultArr = [];

    var gg = db_l.filter(obj => obj.name === user).value();
    resultArr.push(gg[0]);

    res.json(resultArr);
});


router.post('/add_friends', function(req, res, next) {
    const db_l = low(login);
    const params = req.body;

    const user = params.userS;
    const friend = params.userFriendS;

    console.log("user", user);
    console.log("friend", friend);


    var bindingIds = db_l.filter(obj => obj.id === user).value().pop().bindingIds.slice();
    bindingIds.push(+friend);
    db_l.find({ id: user }).assign({ bindingIds: bindingIds }).write();

    var bindingIds1 = db_l.filter(obj => obj.id === friend).value().pop().bindingIds.slice();
    bindingIds1.push(+user);
    db_l.find({ id: friend }).assign({ bindingIds: bindingIds1 }).write();


    res.json(db_l);
});








router.post('/friends', function(req, res, next) {
    const db_l = low(login);
    const params = req.body;
    const friends = params.id;
    const resultArr = [];

    for (var i = 0; i < friends.length; i++) {

        var gg = db_l.filter(obj => obj.id === friends[i].toString()).value();

        resultArr.push(gg[0]);
    }
    console.log("FRIENDS", resultArr)
    res.json(resultArr);
});


router.post('/user_chat', function(req, res, next) {
    const db_l = low(login);
    const params = req.body;
    const user = params.id;

    const user_chat = db_l.filter(obj => obj.id === user).write();

    res.json(user_chat);
});


router.post('/user_messages', function(req, res, next) {
    const params = req.body;
    // {for (let i = 0; i < params.userIds.length; i++) { 
    //     return obj.userIds.indexOf(params.userIds[i]) !== -1
    // }}

    const user_messages = db.get('messages').filter(obj => obj.userIds.indexOf(params.userIds[0]) !== -1 && obj.userIds.indexOf(params.userIds[1]) !== -1).value();
    res.json(user_messages);
});


router.post('/messages_delete', function(req, res, next) {
    const params = req.body;
    db.get('messages')
        .remove(params)
        .write();

    const data = db.get('messages').filter(obj => obj.userIds.indexOf(params.userIds[0]) !== -1 && obj.userIds.indexOf(params.userIds[1]) !== -1).value();
    res.json(data);
});





router.post('/messages_edit', function(req, res, next) {
    const params = req.body;
    const edit_message = {
        userIds: params.userIds,
        id: params.id,
        letter: params.letter,
        originalUser: params.originalUser
    };

    const user_messages = db.get('messages').filter(obj => {
        return obj.userIds.indexOf(params.userIds[0]) !== -1 && obj.userIds.indexOf(params.userIds[1]) !== -1;
    }).find({
        id: edit_message.id
    }).assign({
        letter: edit_message.letter
    }).write();

    const data = db.get('messages').filter(obj => obj.userIds.indexOf(params.userIds[0]) !== -1 && obj.userIds.indexOf(params.userIds[1]) !== -1).value();
    res.json(data);
});


router.post('/messages_add', function(req, res, next) {
    const params = req.body;

    const new_message = {
        userIds: params.userIds,
        id: params.id,
        letter: params.letter,
        originalUser: params.originalUser
    };

    db.get('messages').push(new_message).write();
    const data = db.get('messages').filter(obj => obj.userIds.indexOf(params.userIds[0]) !== -1 && obj.userIds.indexOf(params.userIds[1]) !== -1).value();
    res.json(data);
});


module.exports = router;