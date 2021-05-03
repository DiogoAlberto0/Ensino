
exports.up = function(knex) {
    return knex.schema.table('pai', table => {
        table.string('telI').unique().notNull().defaultTo('Não possui')
        table.string('telII').unique().notNull().defaultTo('tel1')
    })
};

exports.down = function(knex) {
    return knex.schema.table('pai', table =>{
        table.dropColumn('telI')
        table.dropColumn('telII')
    })
};
