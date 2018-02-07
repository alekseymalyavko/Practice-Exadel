import { fetchApi } from './utils';
import objectsPage from './objectsPage';
import form from './form';

const init = (nodeId, namesCol) => {
  const urlTakersData = 'https://jsonblob.com/api/jsonBlob/'+'9fac6022-99d4-11e7-aa97-3180f58ee4c0';
  const fetchTakers = fetchApi(urlTakersData, 'GET');
  
  fetchTakers.then((result) => {
    alert(result);
    // const rootNode = document.getElementById(nodeId);
    // objectsPage.createTable(rootNode, 'table', namesCol);

    // return null;
  });
};


exports.init = (nodeId, namesCol) => init(nodeId, namesCol);


