
exports.up = function(knex, Promise) {
    return knex.schema.createTable('categories', table => {
        table.increments('id').primary() //chave primária auto-increment
        table.string('name').notNull()
        table.integer('parentId').references('id').inTable('categories')
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('categories')
};
