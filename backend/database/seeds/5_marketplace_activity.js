/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('marketplace_activity').del()
  await knex('marketplace_activity').insert([
    {User_ID:1,Activity_Name:'New shop!',Activity_Description:'hi , it is new shop',Activity_Date:'2023-11-23'},
    {User_ID:1,Activity_Name:'new activity! New Member Gifts!',Activity_Description:'Apply for membership now and get a 10 yuan cash coupon!',Activity_Date:'2023-04-06'}
  ]);
};
