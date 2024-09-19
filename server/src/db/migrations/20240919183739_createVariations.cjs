/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("variations", table => {
        table.bigIncrements("id")
        table.bigInteger("productId").unsigned().notNullable().index().references("products.id")
        table.string("imageUrl").notNullable();
        table.string("color_description").notNullable()
        table.string("size").notNullable()
        table.integer("quantity").notNullable()
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("variations")
}
