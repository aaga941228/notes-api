const ID = function () {
  return '_' + Math.random().toString(36).substr(2, 9);
};

module.exports = [
  {
    id: ID(),
    title: 'New note',
    note: 'first note'
  }
]