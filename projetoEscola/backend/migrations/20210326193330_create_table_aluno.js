exports.up = function(knex) {
    return knex.schema.createTable('aluno', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.string('cpfOuCN',).notNull().unique()
        table.string('login').notNull().unique()
        table.string('password').notNull()
        table.string('tipoSanguineo', 4).notNull()
        table.string('planoDeSaude').notNull().defaultTo('Não possui')
        table.string('hospital').notNull()
        table.string('buscarI').notNull()
        table.string('buscarII')
        table.integer('paiId').notNull().references('id').inTable('pai')
        table.integer('turmaId').notNull().references('id').inTable('turmas')

    })
};

exports.down = function(knex) {
    return knex.svhema.dropTable('aluno')
};
