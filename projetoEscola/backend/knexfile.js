module.exports = {
  client: 'postgresql',
  connection: {
    database: 'escolasnoopy',
    user:     'postgres',
    password: '00312001'
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
