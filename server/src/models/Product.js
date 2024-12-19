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
                category: {type: "string"},
                price: {type: ["number", "string"]}
            }
        }
    }

    static get relationMappings() {
        const { Variation } = require("./index.js")
        return {
            variations: {
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