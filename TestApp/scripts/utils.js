module.exports = {
  compare: method => (
    (a, b) => {
      const itemA = typeof a[method] === 'string' ? a[method].toUpperCase() : a[method];
      const itemB = typeof b[method] === 'string' ? b[method].toUpperCase() : b[method];

      let comparison = 0;
      if (itemA > itemB) {
        comparison = 1;
      } else if (itemA < itemB) {
        comparison = -1;
      }

      return comparison;
    }
  ),

  fetchApi: url => (
    fetch(url)
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
  ),
};
