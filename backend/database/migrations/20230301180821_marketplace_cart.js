/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("marketplace_cart", (table) => {
    table
      .increments("Cart_ID")
      .primary({
        constraintName: "pk_marketplaceCart_cartID",
        deferrable: "deferred",
      });
    table.integer("User_ID").unsigned();
    table
      .foreign("User_ID")
      .references("marketplace_user.User_ID")
      .deferrable("deferred");
    table.integer("Item_ID").unsigned();
    table
      .foreign("Item_ID")
      .references("marketplace_item.Item_ID")
      .deferrable("deferred");
    table.decimal("Item_Qty").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("marketplace_cart");
};
