
exports.up = function(knex) {
    return knex.schema.table('professor', (table)=> {
        table.string('telefone').unique()
    })
};

exports.down = function(knex) {
    return knex.schema.table('professor', table => {
        table.dropColumn('telefone')
    })
};
