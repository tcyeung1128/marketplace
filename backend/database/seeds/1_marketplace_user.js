/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  // await knex('marketplace_user').del()
  await knex('marketplace_user').insert([
    {User_Name: "admin", User_Password: '1128',User_admin:true},
    {User_Name: "chung", User_Password: '1128',User_admin:false},
    {User_Name: "chung1", User_Password: '1128',User_admin:false},
    {User_Name: "chung2", User_Password: '1128',User_admin:false},
    {User_Name: "chung3", User_Password: '1128',User_admin:false},
  ]);
};
