
exports.up = function(knex) {
    return knex.schema.createTable('pai', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('cpf').notNull().unique()
        table.string('email').notNull().unique()
        table.string('password').notNull()
        table.string('end').notNull()
        table.string('endTrab')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('pai')
};
