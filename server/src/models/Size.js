const Model = require('./Model.js')

class Size extends Model {
    static get tableName() {
        return "sizes"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["variationId", "size", "quantity"],
            properties: {
                variationId: {type: ["integer", "string"]},
                size: {type: "string"},
                quantity: {type: ["integer", "string"]}
            }
        }
    }

    static get relationMappings() {
        const { Variation } = require("./index.js")
        return {
            variation: {
                relation: Model.BelongsToOneRelation,
                modelClass: Variation,
                join: {
                    from: "size.variationId",
                    to: "variations.id"
                }
            }
        }
    }
}

module.exports = Size