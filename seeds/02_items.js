/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item').del()
  await knex('item').insert([
    {id: 1, UserId: 2, ItemName: 'M16 Rifles', Description: 'M16 Fully automatic assult weapons, using 5.52mm ammunition', Quantity: 55},
    {id: 2, UserId: 2, ItemName: 'Kevlar Vest', Description: 'Body protection equiptment', Quantity: 25},
    {id: 3, UserId: 2, ItemName: 'MRE', Description: 'Meals Ready to eat to provide food for troops', Quantity: 155},
  ]);
};
