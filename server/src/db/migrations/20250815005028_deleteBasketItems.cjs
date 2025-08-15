/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.alterTable("basketItems", table => {
        table.dropForeign("sizeId")
        table.foreign("sizeId").references("sizes.id").onDelete("CASCADE")
    })
}

/**
 * @param {Knex} knex
 */
exports.down = (knex) => {
    return knex.schema.alterTable("basketItems", table => {
        table.dropForeign("sizeId")
        table.foreign("sizeId").references("sizes.id").onDelete("NO ACTION")
    })
}
