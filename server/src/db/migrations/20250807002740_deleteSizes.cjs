/**
 * @typedef {import("knex")} Knex
 */

/**
 * @param {Knex} knex
 */
exports.up = async (knex) => {
    return knex.schema.alterTable("sizes", table => {
        table.dropForeign("variationId")
        table.foreign("variationId").references("variations.id").onDelete("CASCADE")
    })
}

/**
 * @param {Knex} knex
*/
exports.down = (knex) => {
    return knex.schema.alterTable("sizes", table => {
        table.dropForeign("variationId")
        table.foreign("variationId").references("variations.id").onDelete("NO ACTION")
    })
}
