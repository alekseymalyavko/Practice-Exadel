loadMessages();

function loadMessages() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:3000/chat/messages', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        var messages = JSON.parse(xhr.responseText)
        console.log(messages);
        var field = document.getElementById("chat");
        for (i = 0; i < messages.messages.length; i++) {
            field.innerHTML += "<p" + " id=" + messages.messages[i].id + " >" + messages.messages[i].letter + "</p>";
        }
    }
    xhr.send();
};

function target(event) {
    idd = event.target.id;
    letterr = event.target.innerHTML;
    deleteMessage(idd, letterr)
};

function deleteMessage() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/chat/messages_delete');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({ id: idd, letter: letterr }));
}


function editMessage() {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/chat/messages_edit', true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState != 4) return;
        var messages = JSON.parse(xhr.responseText)
        for (var key in messages) {}
    }
    xhr.send();
}


var input = document.getElementById("messageBox");
input.onkeypress = function(e) {
    e = e || window.event;
    if (e.keyCode === 13) {
        message = e.target.value;
        idd = String(getTime());
        sendMessage(idd, message);
    }
}

function sendMessage(idd, message) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/chat/messages_add");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({ id: idd, letter: message }));
}