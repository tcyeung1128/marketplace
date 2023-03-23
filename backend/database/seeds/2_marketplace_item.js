/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex('marketplace_item').del()
  await knex('marketplace_item').insert([
    {Item_Name:'Black Forest Cake',Item_Description:'Black Forest Cake Description',Item_Price:200,Item_Img_Url:'BlackForestCake.webp'},
    {Item_Name:'Chocolate Truffle Cake',Item_Description:'Chocolate Truffle Cake Description',Item_Price:250,Item_Img_Url:'ChocolateTruffleCake.webp'},
    {Item_Name:'Mango Chiffon Cake',Item_Description:'Mango Chiffon Cake Description',Item_Price:230,Item_Img_Url:'MangoChiffonCake.webp'},
    {Item_Name:'Red Berries Chiffon Cake',Item_Description:'Red Berries Chiffon Cake Description',Item_Price:230,Item_Img_Url:'RedBerriesChiffonCake.webp'},
    {Item_Name:'Red Velvet Cake',Item_Description:'Red Velvet Cake Description',Item_Price:230,Item_Img_Url:'RedVelvetCake.webp'},
    {Item_Name:'Strawberry Chiffon Cake',Item_Description:'Strawberry Chiffon Cake Description',Item_Price:230,Item_Img_Url:'StrawberryChiffonCake.webp'}
  ]);
};
