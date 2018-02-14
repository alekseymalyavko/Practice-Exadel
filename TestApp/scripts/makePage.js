(function createPage() {

    if (document.getElementById('article')) {

        const data = JSON.parse(localStorage.getItem("urls"));

        console.log(localStorage.getItem("urls"))

        let id = "";
        let title = "";
        let description = "";
        let news = "";

        const urlTakersData = 'https://jsonblob.com/api/jsonBlob/' + data[data.length - 1];

        fetch(urlTakersData, {
                method: 'get'
            })
            .then((response) => {
                if (!response.ok) {
                    return Promise.reject(response.json);
                }
                return response;
            })
            .then(
                resp => (resp.json()),
                error => ({ error: error.message || 'Something bad happened' }),
            )
            .then((resp) => {
                console.log(resp);

                id = resp.id;
                title = resp.title;
                description = resp.description;
                news = resp.news;

                let getTitle = document.getElementById('title');
                getTitle.setAttribute('data-news-id', id);
                getTitle.innerHTML = title;
                document.getElementById('description').innerHTML = description;
                document.getElementById('news').innerHTML = news;
            });
    };
})();