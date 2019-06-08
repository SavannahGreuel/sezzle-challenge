
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
  .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {name: 'sally', calculation: 1},
        {name: 'corey', calculation: 100},
        {name: 'savannah', calculation: 100000},
        
      ]);
    });
};
