/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function(knex) {
    return knex.schema.createTable('item', table => {
        table.increments("id");
        table.integer('UserId').references('users.id');
        table.string('ItemName', 50);
        table.string('Description', 250);
        table.integer('Quantity');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('item');
};