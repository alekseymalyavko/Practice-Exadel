import { getTakers, sortTakers } from './store';


const objectsPage = {
  renderTrsTable() {
    const testtakers = getTakers();
    this.tbody.innerHTML = testtakers.reduce((accumulator, item) => {
      const tdsStr = this.namesCol.reduce((str, name) => `${str}<td>
        ${item[name.toLowerCase()]}</td>`, '');

      return `${accumulator}<tr class="login" data-login=${item.login}>
          ${tdsStr}
        </tr>`;
    }, '');
  },



  renderThsTable() {
    const newTr = document.createElement('tr');
    newTr.innerHTML = this.namesCol.reduce((accumulator, item) => (
      `${accumulator}<th>
        <a href="" id=${item.toLowerCase()}>${item}</a>      
      </th>`
    ), '');
    this.table.insertBefore(newTr, this.tbody);
  },

  

  createTable(parentNode, tableId, namesCol) {
    this.namesCol = namesCol;
    const table = document.createElement('table');
    table.setAttribute('id', tableId);
    table.innerHTML = '<tbody></tbody>';
    this.table = parentNode.appendChild(table);
    this.tbody = this.table.firstChild;
    sortTakers(namesCol[0].toLowerCase());

    this.renderThsTable();
    this.renderTrsTable();
    this.addThsEventHandler();
    this.addTdsEventHandler();
  },

  addTdsEventHandler: () => {
    document.addEventListener('click', (e) => {
      const nodeTr = e.target.closest('.login');
      if (e.target && nodeTr) {
        e.preventDefault();
        const testtakers = getTakers();
        const login = nodeTr.getAttribute('data-login');
        const object = testtakers.find(item => item.login === login);
        alert(JSON.stringify(object)); // eslint-disable-line no-alert
      }
    });
  },

  addThsEventHandler() {
    this.namesCol.forEach((name) => {
      document.addEventListener('click', e => this.rerenderTable(e, name.toLowerCase()));
    });
  },

  rerenderTable(e, col) {
    if (e.target && e.target.id === col) {
      e.preventDefault();

      sortTakers(col);

      this.clearNode(this.table.lastChild);
      this.renderTrsTable();
    }
  },

  clearNode: (node) => {
    while (node.firstChild) {
      node.removeChild(node.firstChild);
    }
  },
};

module.exports = objectsPage;
