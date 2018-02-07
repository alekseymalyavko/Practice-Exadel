function get() {
    var name = document.getElementById("name").value;
    var password = document.getElementById("password").value;

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/login/check");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({ name: name, password: password }));

    if (password !== "" && name !== "") {
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;
        
        var validation = JSON.parse(xhr.responseText);
        if (name === validation.name && password === validation.password) {
            var id = localStorage.setItem('id', validation.id);
            var id = localStorage.setItem('friends', validation.bindingIds);
            window.location.href = "http://localhost:3000/chat";
        }
    }  
}
    else alert("Check your form!");
}