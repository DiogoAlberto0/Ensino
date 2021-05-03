exports.up = function(knex) {
    return knex.schema.table('professor', function(table) {
        table.integer('cargoId').references('id').inTable('cargos').notNull().defaultTo(7)
    })
};

exports.down = function(knex) {
    return knex.schema.table('professor', function(table) {
        table.dropColumn('professor')
    })
};

