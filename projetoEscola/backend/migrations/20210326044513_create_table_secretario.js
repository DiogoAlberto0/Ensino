exports.up = function(knex) {
    return knex.schema.createTable('secretario', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('cpf').notNull().unique()
        table.string('telefone').notNull().unique()
        table.string('email').notNull().unique()
        table.string('password').notNull()
        table.integer('diretorId').references('id').inTable('diretor')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('secretario')
};
