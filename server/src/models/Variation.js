const Model = require('./Model.js')

class Variation extends Model {
    static get tableName() {
        return "variations"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["productId", "imageUrl", "color_description", "quantity", "price"],
            properties: {
                productId: {type: ["integer", "string"]},
                imageUrl: {type: "string"},
                color_description: {type: "string"},
                quantity: {type: ["integer", "string"]},
                price: {type: ["number", "string"]}
            }
        }
    }

    static get relationMappings() {
        const { Product } = require("./index.js")
        return {
            product: {
                relation: Model.HasOneRelation,
                modelClass: Product,
                join: {
                    from: "variations.productId",
                    to: "products.id"
                }
            }
        }
    }
}

module.exports = Variation