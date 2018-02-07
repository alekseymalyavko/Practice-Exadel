import { compare } from './utils';

let takers = [];

module.exports = {
  setTakers: (value) => {
    takers = value;
    return null;
  },
  getTakers: () => takers,
  sortTakers: (column) => {
    takers.sort(compare(column));
    return null;
  },
};
