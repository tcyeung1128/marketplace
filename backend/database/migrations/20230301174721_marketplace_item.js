/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("marketplace_item", (table) => {
    table
      .increments("Item_ID")
      .primary({
        constraintName: "pk_marketplaceItem_itemID",
        deferrable: "deferred",
      });
    table.string("Item_Name").notNullable();
    table.string("Item_Description");
    table.decimal("Item_Price").notNullable();
    table.string("Item_Img_Url").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("marketplace_item");
};
