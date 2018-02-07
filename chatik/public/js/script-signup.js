function createUser(){

    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var Fpassword = document.getElementById("Fpassword").value;
    
    if (Fpassword === password && Fpassword !== "" && name !== "" && email !== "") {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/signup");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({ name: name, password: password, email: email}));

    xhr.onreadystatechange = function() {
        if (xhr.readyState !== 4) return;
        alert("Account created!")
        window.location.href = "http://localhost:3000/login";
    }
}	
    else alert("Check form, please")
}
