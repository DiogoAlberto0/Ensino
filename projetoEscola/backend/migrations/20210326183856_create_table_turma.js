
exports.up = function(knex) {
    return knex.schema.createTable('turmas', table => {
        table.increments('id').primary()
        table.string('serie').notNull()
        table.string('ano').notNull()
        table.string('periodo').notNull()
        table.integer('professorId').references('id').inTable('professor')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('turmas')
};
