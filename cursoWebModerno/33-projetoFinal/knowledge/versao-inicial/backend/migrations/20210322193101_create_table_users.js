
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary() //chave primaria auto-increment
        table.string('name').notNull()
        table.string('email').notNull().unique()// Único
        table.string('password').notNull()
        table.boolean('admin').notNull().defaultTo(false) //valor padrão: FALSE
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users')
};
