import { fetchApi } from './utils';
import { setTakers } from './store';
import objectsPage from './objectsPage';


const init = (nodeId, namesCol) => {
  const urlTakersData = 'https://jsonblob.com/api/jsonBlob/'+'9fac6022-99d4-11e7-aa97-3180f58ee4c0';
  const fetchTakers = fetchApi(urlTakersData, 'GET');
  
  fetchTakers.then((result) => {
    setTakers(result);

    const rootNode = document.getElementById(nodeId);
    objectsPage.createTable(rootNode, 'table', namesCol);

    return null;
  });
};


exports.init = (nodeId, namesCol) => init(nodeId, namesCol);




function sendNews() {

	const title = document.forms["myForm"]["title"].value;
	const description = document.forms["myForm"]["description"].value;
	const news = document.forms["myForm"]["news"].value;

    if (title && description && news) {
        alert("all ok");
    }
    alert ("check form")
}


