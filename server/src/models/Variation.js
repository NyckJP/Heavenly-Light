const Model = require('./Model.js')

class Variation extends Model {
    static get tableName() {
        return "variations"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["productId", "imageUrl", "color_description", "size", "quantity"],
            properties: {
                productId: {type: ["integer", "string"]},
                imageUrl: {type: "string"},
                color_description: {type: "string"},
                size: {type: "string"},
                quantity: {type: ["integer", "string"]}
            }
        }
    }
}

module.exports = Variation