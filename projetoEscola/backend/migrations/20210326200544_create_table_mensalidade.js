
exports.up = function(knex) {
    return knex.schema.createTable('mensalidade', table => {
        table.increments('id').primary()
        table.string('ano', 4).notNull()
        table.string('mes', 10).notNull()
        table.float('valor').notNull()
        table.integer('secretarioId').notNull().references('id').inTable('secretario')
        table.integer('paiId').notNull().references('id').inTable('pai')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('mensalidade')
};
