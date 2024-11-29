/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("basketItems", table => {
        table.bigIncrements("id")
        table.bigInteger("userId").references("users.id")
        table.bigInteger("variationId").unsigned().notNullable().references("variations.id")
        table.integer("quantity").notNullable()
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("basketItems")
}
