const Model = require('./Model.js')

class BasketItem extends Model {
    static get tableName() {
        return "basketItems"
    }

    static get jsonSchema() {
        return {
            type: "object",
            required: ["sizeId", "quantity"],
            properties: {
                sizeId: {type: ["integer", "string"]},
                quantity: {type: ["integer", "string"]}
            }
        }
    }
}

module.exports = BasketItem