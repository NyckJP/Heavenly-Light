const Model = require('./Model.js')

class Product extends Model {
    static get tableName() {
        return "products"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["name", "imageUrl", "price", "category"],
            properties: {
                name: {type: "string"},
                imageUrl: {type: "string"},
                price: {type: ["number", "string"]},
                category: {type: "string"}
            }
        }
    }

    static get relationMappings() {
        const { Variation } = require("./index.js")
        return {
            variation: {
                relation: Model.HasManyRelation,
                modelClass: Variation,
                join: {
                    from: "products.id",
                    to: "variations.productId"
                }
            }
        }
    }
}

module.exports = Product