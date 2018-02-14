const regForm = document.getElementById("regForm");

if (regForm) {
    regForm.addEventListener('submit', (e) => {

        e.preventDefault();

        const name = e.target.elements.name.value;
        const nickname = e.target.nickname.value;
        const city = e.target.city.value;
        const email = e.target.email.value;

        const sex = e.target.sex.value;
        const number = e.target.number.value;
        const password = e.target.password.value;
        const agree = e.target.agree.value;


   if (name&&  nickname&& city&& sex&&email &&number &&password &&agree) {
     console.log("all ok");

        let data = {
                name:name,
                nickname:nickname,
                city:city,
                sex:sex,
                email:email,
                number:number,
                password:password,
                agree:agree
        };

        fetch('https://jsonblob.com/api/jsonBlob', {
                    method: 'POST',
                    headers: {
                                'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                    })
                    .then(res => {
                    const urlId = res.headers.get('x-jsonblob');
                    console.log(urlId);
                    console.log(res);
                    })
                    .catch(console.log)
    }
         else {
            alert("check form")
        }
});
};