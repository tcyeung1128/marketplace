/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('marketplace_cart').del()
  await knex('marketplace_cart').insert([
    {User_ID:1,Item_ID:1,Item_Qty:2},
    {User_ID:1,Item_ID:2,Item_Qty:2},
    {User_ID:2,Item_ID:1,Item_Qty:2},
    {User_ID:1,Item_ID:1,Item_Qty:6}
  ]);
};
