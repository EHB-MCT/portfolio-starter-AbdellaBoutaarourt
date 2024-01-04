/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('anime', function (table) {
        table.increments('id').primary();
        table.integer('userId').unsigned().notNullable();
        table.foreign('userId').references('users.id').onDelete('CASCADE');
        table.string('animeName').notNullable();
        table.string('animeImg').notNullable();
        table.text('animeDescription').notNullable();
        table.string('AnimeProducer').notNullable();
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('anime');

};
