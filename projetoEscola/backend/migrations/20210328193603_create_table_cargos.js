
exports.up = function(knex) {
    return knex.schema.createTable('cargos', (table) => {
        table.increments('id').primary()
        table.string('name').notNull().unique()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('cargos')
};
