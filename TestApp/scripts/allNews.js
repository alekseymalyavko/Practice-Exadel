import urls from './form';

//выводить все новости на др стр
//по заголовку на новую стр page

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
                                let id = res.id;
                                let title = res.title;
                                let description = res.description;
                                let news = res.news;

                                let section = document.createElement("section");
                                section.id = "section";
                                allNewsContent.appendChild(section);

                                let titleField = document.createElement("h1");
                                titleField.className = "title";
                                titleField.id = id;
                                titleField.setAttribute('href', item);                                
                                titleField.setAttribute('data-news-id', id);
                                titleField.innerHTML = title;
                                section.appendChild(titleField);

                                let descriptionField = document.createElement("h3");
                                descriptionField.id = "description";
                                descriptionField.innerHTML = description;
                                section.appendChild(descriptionField);

                                let newsField = document.createElement("p");
                                newsField.id = "news";
                                newsField.innerHTML = news;
                                section.appendChild(newsField);
                        })
                    })
                    console.log(res);
                });
};
