/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('marketplace_order').del()
  await knex('marketplace_order').insert([
    {Order_No:1,User_ID:1,Item_ID:2,Item_Qty:2,Item_TotalPrice:700},
    {Order_No:1,User_ID:1,Item_ID:3,Item_Qty:5,Item_TotalPrice:900},
    {Order_No:2,User_ID:2,Item_ID:2,Item_Qty:2,Item_TotalPrice:700},
    {Order_No:2,User_ID:2,Item_ID:4,Item_Qty:2,Item_TotalPrice:700},
    {Order_No:2,User_ID:2,Item_ID:3,Item_Qty:4,Item_TotalPrice:700},
  ]);
};
