if (document.getElementById('allNews') ) {

                const allNewsContent = document.getElementById("allNewsContent");
                fetch("https://jsonblob.com/api/jsonBlob/0dcd4172-0d9a-11e8-8cfd-d5ef9f6c6c7d", {
                method: 'get'
                })
                .then(
                    res => (res.json()),
                    error => ({ error: error.message || 'Something bad happened' }),
                )
                .then(res => {

                    res.forEach(function(item){
                        fetch("https://jsonblob.com/api/jsonBlob/"+ item, {
                        method: 'get'
                        })
                        .then(
                            res => (res.json()),
                            error => ({ error: error.message || 'Something bad happened' }),
                        )
                        .then(res => {
                                const id = res.id;
                                const title = res.title;
                                const description = res.description;
                                const news = res.news;

                                const section = document.createElement("section");
                                section.id = "section";
                                allNewsContent.appendChild(section);

                                const titleField = document.createElement("h1");
                                titleField.className = "title";
                                titleField.id = id;
                                titleField.setAttribute('href', item);                                
                                titleField.setAttribute('data-news-id', id);
                                titleField.innerHTML = title;
                                section.appendChild(titleField);

                                const descriptionField = document.createElement("h3");
                                descriptionField.id = "description";
                                descriptionField.innerHTML = description;
                                section.appendChild(descriptionField);

                                const newsField = document.createElement("p");
                                newsField.id = "news";
                                newsField.innerHTML = news;
                                section.appendChild(newsField);
                        });
                    })
                    .catch(console.log);
                })
                .catch(console.log);
};
