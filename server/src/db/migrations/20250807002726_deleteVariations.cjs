/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.alterTable("variations", table => {
        table.dropForeign("productId")
        table.foreign("productId").references("products.id").onDelete("CASCADE")
    })
}

/**
 * @param {Knex} knex
*/
exports.down = (knex) => {
    return knex.schema.alterTable("variations", table => {
        table.dropForeign("productId")
        table.foreign("productId").references("products.id").onDelete("NO ACTION")
    })
}
