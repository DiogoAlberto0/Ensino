exports.up = function(knex) {
    return knex.schema.table('pai', function(table) {
        table.integer('cargoId').references('id').inTable('cargos').notNull().defaultTo(7)
    })
};

exports.down = function(knex) {
    return knex.schema.table('pai', function(table) {
        table.dropColumn('pai')
    })
};
