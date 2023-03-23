/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("marketplace_user", (table) => {
    table.increments("User_ID").primary({constraintName:'pk_marketplaceUser_userID',deferrable:'deferred'});
    table.string("User_Name").notNullable();
    table.string("User_Password").notNullable();
    table.boolean("User_admin").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("marketplace_user");
};
