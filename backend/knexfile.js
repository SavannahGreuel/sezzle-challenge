// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      host: "https://guarded-hamlet-96437.herokuapp.com/"
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },
  



};
