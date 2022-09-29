/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, FirstName: 'Luke', LastName: 'Tyler', Username: 'lbtyler', PasswordHash: "admin123"},
    {id: 2, FirstName: 'Emily', LastName: 'Wilder', Username: 'emwilde', PasswordHash: "admin1234"},
    {id: 3, FirstName: 'Johnathan', LastName: 'Smith', Username: 'jbsmit', PasswordHash: "admin12345"}
  ]);
};

