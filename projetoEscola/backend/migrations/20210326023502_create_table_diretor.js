
exports.up = function(knex) {
    return knex.schema.createTable('diretor', (table) => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('cpf').notNull().unique()
        table.string('telefone').notNull().unique()
        table.string('email').notNull().unique()
        table.string('password').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('diretor')
};
