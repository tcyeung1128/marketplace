/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("marketplace_order", (table) => {
    table.increments("Order_ID").primary({
      constraintName: "pk_marketplaceOrder_orderID",
      deferrable: "deferred",
    });
    table.integer("Order_No").notNullable();
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
    table.decimal("Item_TotalPrice").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("marketplace_order");
};
