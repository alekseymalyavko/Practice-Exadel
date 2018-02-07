import { fetchApi } from './utils';




const form = document.getElementById("form").addEventListener('submit', (e) => {



            const title = e.target.elements.namedItem("title").value;
            const description = e.target.description.value;
            const news = e.target.news.value;



            if (title && description && news) {
                  alert("all ok");
            
            event.preventDefault();

            let data = {
            	  id: 1,
				  title: title,
				  description: description,
				  news: news
			}; 

			let jsonData = JSON.stringify(data);


		const urlTakersData = 'https://jsonblob.com/api/jsonBlob/'+'caba6a51-0c0e-11e8-89c8-cdf184dec2d0';

		const fetchTakers = fetchApi(urlTakersData, 'GET');
		  
		fetchTakers.then((result) => {
		    
		console.log(result)

		});

        	}

            else  alert ("check form")

           
});



module.exports = form;
