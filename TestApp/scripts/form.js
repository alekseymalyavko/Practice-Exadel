const form = document.getElementById("form");
const getRandomId = (min, max)=> {
            return Math.round(Math.random() * (max - min) + min);
        };

if (form) {
    form.addEventListener('submit', (e) => {

        e.preventDefault();

        const title = e.target.elements.title.value;
        const description = e.target.description.value;
        const news = e.target.news.value;
        const id = getRandomId(1, 1000);

        if (title && description && news) {

            console.log("all ok");

            let data = {
                id: id,
                title: title,
                description: description,
                news: news
            };

            fetch("https://jsonblob.com/api/jsonBlob/0dcd4172-0d9a-11e8-8cfd-d5ef9f6c6c7d", {
                    method: 'get'
                })
                .then(
                    res => (res.json()),
                    error => ({ error: error.message || 'Something bad happened' }),
                )
                .then(res => {

                    const urls = [...res];
                    fetch('https://jsonblob.com/api/jsonBlob', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(data)
                        })
                        .then(res => {
                            const urlId = res.headers.get('x-jsonblob');

                            urls.push(urlId);

                            localStorage.setItem('urls', JSON.stringify(urls));
                        })
                        .then(res => {
                            fetch('https://jsonblob.com/api/jsonBlob/0dcd4172-0d9a-11e8-8cfd-d5ef9f6c6c7d', {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(urls)
                                })
                                .then(res => res.json())
                                .catch(console.log)
                                .then(res => {

                                    window.location.href = "file:///C:/Users/lexam/Desktop/practice/hello-world/TestApp/page.html"
                                })
                                .catch(console.log)
                        })
                        .catch(console.log)
                })
                .catch(console.log)
        } else {
            alert("check form")
        }
    });
};