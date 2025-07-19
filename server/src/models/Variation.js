const Model = require('./Model.js')

class Variation extends Model {
    static get tableName() {
        return "variations"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["productId", "imageUrl", "color"],
            properties: {
                productId: {type: ["integer", "string"]},
                imageUrl: {type: "string"},
                color: {type: "string"}
            }
        }
    }

    static get relationMappings() {
        const { Size } = require("./index.js")
        return {
            Size: {
                relation: Model.HasManyRelation,
                modelClass: Size,
                join: {
                    from: "variations.id",
                    to: "sizes.variationId"
                }
            }
        }
    }
}

module.exports = Variation