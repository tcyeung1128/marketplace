/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("marketplace_activity", (table) => {
    table.increments("Activity_ID").primary({
      constraintName: "pk_marketplaceActivity_activityID",
      deferrable: "deferred",
    });
    table.integer("User_ID").unsigned();
    table
      .foreign("User_ID")
      .references("marketplace_user.User_ID")
      .deferrable("deferred");
    table.string("Activity_Name").notNullable();
    table.string("Activity_Description").notNullable();
    table.date("Activity_Date").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("marketplace_activity");
};
