/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.createTable("products", table => {
        table.bigIncrements("id")
        table.string("name").notNullable()
        table.string("imageUrl").notNullable()
        table.decimal("price").notNullable()
        table.string("details") //shirt materials, mug ounces, crochet dimensions
        table.string("category").notNullable()
        table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now())
        table.timestamp("updatedAt").notNullable().defaultTo(knex.fn.now())
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.dropTableIfExists("products")
}
