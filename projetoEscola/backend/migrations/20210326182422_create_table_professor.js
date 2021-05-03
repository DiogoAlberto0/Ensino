
exports.up = function(knex) {
    return knex.schema.createTable('professor', (table) => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('cpf').notNull().unique()
        table.string('email').notNull().unique()
        table.string('password').notNull()
        table.boolean('ativo').notNull().defaultTo(true)
        table.integer('coordenadorId').references('id').inTable('coordenador')

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('professor')
};
