
exports.up = function(knex) {
    return knex.schema.createTable('aulas', table => {
        table.increments('id').primary()
        table.string('title').notNull()
        table.string('description', 1000).notNull()
        table.string('videoUrl', 1000).notNull()
        table.integer('turmaId').references('id').inTable('turmas')
    })
};

exports.down = function(knex) {
    return knex.svhema.dropTable('aulas')
};
