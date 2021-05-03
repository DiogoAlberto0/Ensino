
exports.up = function(knex, Promise) {
    return knex.schema.createTable('articles', table => {
        table.increments('id').primary() //chave primaria auto-increment
        table.string('name').notNull()
        table.string('description', 1000).notNull()
        table.string('imgIrl', 1000)
        table.binary('content').notNull()
        table.integer('userId').references('id').inTable('users') //chave estrangeira da tabela usarios
        table.integer('categoryId').references('id').inTable('categories') // || || || categorias

    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('articles') //excluir tabela
};
