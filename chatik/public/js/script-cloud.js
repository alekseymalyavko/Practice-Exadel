var user = "";

var userId = localStorage.getItem("id");
var userfriends = localStorage.getItem("friends").split(',').map(friends => parseInt(friends));
var userFriend = "";
userChat(userId);


function out() {
    var dialog = confirm("Are you sure?");
    if (dialog) {
        localStorage.clear();
        window.location.href = "http://localhost:3000/login";
    }
}


function findUser() {
    var input = document.getElementById("findUser");
    input.onkeypress = function(e) {
        e = e || window.event;
        if (e.keyCode === 13) {
            user = e.target.value;
            e.target.value = "";
            findFriends(user);
        }
    }

    function findFriends(user) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/chat/find_friends');
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) return;
            var users = JSON.parse(xhr.responseText);
            var field = document.getElementById("contacts");

            for (var i = 0; i < users.length; i++) {
                field.innerHTML += "<li data-user-id=" + users[i].id + ">" + users[i].name.toUpperCase() + "</li>"
            }
        }
        xhr.send(JSON.stringify({ user: user }));
    };
};

function addUser(user, userId) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/chat/add_friends');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;
        var users = JSON.parse(xhr.responseText);
    }
    xhr.send(JSON.stringify({ userS: user, userFriendS: userId }));
};


function userChat(userId) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/chat/user_chat');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;
        var user_chat = JSON.parse(xhr.responseText)
        var field = document.getElementById("user");
        field.innerHTML += "<h3>" + user_chat[0].name.toUpperCase() + "</h3>"

    }
    xhr.send(JSON.stringify({ id: userId }));
    loadUsers(userfriends);
    addInputHeandler();
}

function loadUsers(userfriends) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/chat/friends');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;
        var users = JSON.parse(xhr.responseText);
        var field = document.getElementById("contacts");
        for (var i = 0; i < users.length; i++) {
            field.innerHTML += "<li data-user-id=" + users[i].id + ">" + users[i].name.toUpperCase() + "</li>"
        }
        contactName(users[0].name.toUpperCase());
    }
    xhr.send(JSON.stringify({ id: userfriends }));
    addInputHeandler();
};

function contactName(event) {

    var field = document.getElementById("chat");
    field.innerHTML = "";

    if (typeof(event) === "string") {
        var guiUser = event;
        var fieldPartner = document.getElementById("partner");
        fieldPartner.innerHTML = "<h4>" + guiUser + "</h4>";
        user = userfriends[0].toString();
        loadMessages(user);
    }

    if (event.target) {
        var guiUser = event.target.innerHTML;
        if (event.target.tagName === "LI") {

            if (event.target) {
                event.target.classList.add('clicked');
            }

            var fieldPartner = document.getElementById("partner");
            fieldPartner.innerHTML = "<h4>" + guiUser + "</h4>";
        }
        user = event.target.dataset.userId;
        loadMessages(user);
    }
}


function loadMessages(user) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/chat/user_messages');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;
        var messages = JSON.parse(xhr.responseText);

        if (messages.length === 0) {
            addUser(user, userId);
            return;
        }

        var field = document.getElementById("chat");
        var messagePlace = " ";

        for (var i = 0; i < messages.length; i++) {
            if (messages[i].originalUser === userId) {
                messagePlace = "userletter";
            } else {
                messagePlace = "friendletter";
            }
            field.innerHTML += "<p class=" + messagePlace + " id=" + messages[i].id + " >" + "<a class=btn id=edit><i class=material-icons>edit</i></a>" + "<a class=btn id=delete><i class=material-icons>delete</i></a>" + messages[i].letter + "</p>";
        }
    }
    xhr.send(JSON.stringify({ userIds: [userId, user] }));
    addInputHeandler();
};

function target(event) {
    if (event.target.id == "delete") {
        idd = event.target.parentNode.id;
        letterr = event.target.parentNode.lastChild.data;
        deleteMessage(idd, letterr);
    } else if (event.target.id == "edit") {
        idd = event.target.parentNode.id;
        letterr = event.target.parentNode.lastChild.data;
        editMessage(user, idd, letterr);
    }
};


function deleteMessage(idd, letterr) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/chat/messages_delete');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({ userIds: [userId, user], id: idd, letter: letterr, originalUser: userId }));

    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;
        var messages = JSON.parse(xhr.responseText)
        var field = document.getElementById("chat");
        field.innerHTML = "";

        var messagePlace = " ";

        for (var i = 0; i < messages.length; i++) {
            if (messages[i].originalUser === userId) {
                messagePlace = "userletter";
            } else {
                messagePlace = "friendletter";
            }
            field.innerHTML += "<p class=" + messagePlace + " id=" + messages[i].id + " >" + "<a class=btn id=edit><i class=material-icons>edit</i></a>" + "<a class=btn id=delete><i class=material-icons>delete</i></a>" + messages[i].letter + "</p>";
        }
    }
}


function editMessage(user, idd, message) {

    var input = document.getElementById("messageBox");
    input.value = message;
    input.onkeypress = function(e) {
        e = e || window.event;
        if (e.keyCode === 13) {
            message = e.target.value;
            e.target.value = "";
            sendEditMessage(idd, message);

        }
    }

    function sendEditMessage(idd, message) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/chat/messages_edit');
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function() {
            if (xhr.readyState !== 4) return;
            var messages = JSON.parse(xhr.responseText)
            var field = document.getElementById("chat");
            field.innerHTML = "";

            var messagePlace = " ";

            for (var i = 0; i < messages.length; i++) {
                if (messages[i].originalUser === userId) {
                    messagePlace = "userletter";
                } else {
                    messagePlace = "friendletter";
                }
                field.innerHTML += "<p class=" + messagePlace + " id=" + messages[i].id + " >" + "<a class=btn id=edit><i class=material-icons>edit</i></a>" + "<a class=btn id=delete><i class=material-icons>delete</i></a>" + messages[i].letter + "</p>";
            }

        }
        xhr.send(JSON.stringify({ userIds: [userId, user], id: idd, letter: message, originalUser: userId }));
        addInputHeandler();
    }


}

function addInputHeandler() {
    var input = document.getElementById("messageBox");
    input.onkeypress = function(e) {
        e = e || window.event;
        if (e.keyCode === 13) {
            message = e.target.value;
            idd = String(getTime());
            sendMessage(idd, message);
            e.target.value = "";
        }
    }
}

function sendMessage(idd, message) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/chat/messages_add");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({ userIds: [userId, user], id: idd, letter: message, originalUser: userId }));
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;
        var messages = JSON.parse(xhr.responseText)
        var field = document.getElementById("chat");
        field.innerHTML = "";

        var messagePlace = " ";

        for (var i = 0; i < messages.length; i++) {
            if (messages[i].originalUser === userId) {
                messagePlace = "userletter";
            } else {
                messagePlace = "friendletter";
            }
            field.innerHTML += "<p class=" + messagePlace + " id=" + messages[i].id + " >" + "<a class=btn id=edit><i class=material-icons>edit</i></a>" + "<a class=btn id=delete><i class=material-icons>delete</i></a>" + messages[i].letter + "</p>";
        }
    }
}