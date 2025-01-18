import { Variation } from "../../models/index.js"

class VariationSeeder {
    static async seed() {
        await Variation.query().delete()

        //T-Shirt
        await Variation.query().insert({
            productId: 1,
            imageUrl: "image",
            color_description: "Original",
            size: "S",
            quantity: 5,
            price: 9.99
        })
        await Variation.query().insert({
            productId: 1,
            imageUrl: "image",
            color_description: "Original",
            size: "M",
            quantity: 5,
            price: 9.99
        })
        await Variation.query().insert({
            productId: 1,
            imageUrl: "image",
            color_description: "Original",
            size: "L",
            quantity: 5,
            price: 9.99
        })
        await Variation.query().insert({
            productId: 1,
            imageUrl: "image",
            color_description: "Original",
            size: "XL",
            quantity: 5,
            price: 9.99
        })
        await Variation.query().insert({
            productId: 1,
            imageUrl: "image",
            color_description: "Red",
            size: "S",
            quantity: 5,
            price: 9.99
        })
        await Variation.query().insert({
            productId: 1,
            imageUrl: "image",
            color_description: "Red",
            size: "M",
            quantity: 5,
            price: 9.99
        })
        await Variation.query().insert({
            productId: 1,
            imageUrl: "image",
            color_description: "Red",
            size: "L",
            quantity: 5,
            price: 9.99
        })
        await Variation.query().insert({
            productId: 1,
            imageUrl: "image",
            color_description: "Red",
            size: "XL",
            quantity: 5,
            price: 9.99
        })
        await Variation.query().insert({
            productId: 1,
            imageUrl: "image",
            color_description: "Green",
            size: "S",
            quantity: 5,
            price: 9.99
        })
        await Variation.query().insert({
            productId: 1,
            imageUrl: "image",
            color_description: "Green",
            size: "M",
            quantity: 5,
            price: 9.99
        })
        await Variation.query().insert({
            productId: 1,
            imageUrl: "image",
            color_description: "Green",
            size: "L",
            quantity: 5,
            price: 9.99
        })
        await Variation.query().insert({
            productId: 1,
            imageUrl: "image",
            color_description: "Green",
            size: "XL",
            quantity: 5,
            price: 9.99
        })
        await Variation.query().insert({
            productId: 1,
            imageUrl: "image",
            color_description: "Blue",
            size: "S",
            quantity: 5,
            price: 9.99
        })
        await Variation.query().insert({
            productId: 1,
            imageUrl: "image",
            color_description: "Blue",
            size: "M",
            quantity: 5,
            price: 9.99
        })
        await Variation.query().insert({
            productId: 1,
            imageUrl: "image",
            color_description: "Blue",
            size: "L",
            quantity: 5,
            price: 9.99
        })
        await Variation.query().insert({
            productId: 1,
            imageUrl: "image",
            color_description: "Blue",
            size: "XL",
            quantity: 5,
            price: 9.99
        })

        //Hoodie
        await Variation.query().insert({
            productId: 2,
            imageUrl: "image",
            color_description: "White",
            size: "S",
            quantity: 5,
            price: 14.99
        })
        await Variation.query().insert({
            productId: 2,
            imageUrl: "image",
            color_description: "White",
            size: "M",
            quantity: 5,
            price: 14.99
        })
        await Variation.query().insert({
            productId: 2,
            imageUrl: "image",
            color_description: "White",
            size: "L",
            quantity: 5,
            price: 14.99
        })
        await Variation.query().insert({
            productId: 2,
            imageUrl: "image",
            color_description: "White",
            size: "XL",
            quantity: 5,
            price: 14.99
        })
        await Variation.query().insert({
            productId: 2,
            imageUrl: "image",
            color_description: "Gray",
            size: "S",
            quantity: 5,
            price: 14.99
        })
        await Variation.query().insert({
            productId: 2,
            imageUrl: "image",
            color_description: "Gray",
            size: "M",
            quantity: 5,
            price: 14.99
        })
        await Variation.query().insert({
            productId: 2,
            imageUrl: "image",
            color_description: "Gray",
            size: "L",
            quantity: 5,
            price: 14.99
        })
        await Variation.query().insert({
            productId: 2,
            imageUrl: "image",
            color_description: "Gray",
            size: "XL",
            quantity: 5,
            price: 14.99
        })
        await Variation.query().insert({
            productId: 2,
            imageUrl: "image",
            color_description: "Blue",
            size: "S",
            quantity: 5,
            price: 14.99
        })
        await Variation.query().insert({
            productId: 2,
            imageUrl: "image",
            color_description: "Blue",
            size: "M",
            quantity: 5,
            price: 14.99
        })
        await Variation.query().insert({
            productId: 2,
            imageUrl: "image",
            color_description: "Blue",
            size: "L",
            quantity: 5,
            price: 14.99
        })
        await Variation.query().insert({
            productId: 2,
            imageUrl: "image",
            color_description: "Blue",
            size: "XL",
            quantity: 5,
            price: 14.99
        })

        //Button Down
        await Variation.query().insert({
            productId: 3,
            imageUrl: "image",
            color_description: "White",
            size: "S",
            quantity: 5,
            price: 19.99
        })
        await Variation.query().insert({
            productId: 3,
            imageUrl: "image",
            color_description: "White",
            size: "M",
            quantity: 5,
            price: 19.99
        })
        await Variation.query().insert({
            productId: 3,
            imageUrl: "image",
            color_description: "White",
            size: "L",
            quantity: 5,
            price: 19.99
        })
        await Variation.query().insert({
            productId: 3,
            imageUrl: "image",
            color_description: "White",
            size: "XL",
            quantity: 5,
            price: 19.99
        })
        await Variation.query().insert({
            productId: 3,
            imageUrl: "image",
            color_description: "Black",
            size: "S",
            quantity: 5,
            price: 19.99
        })
        await Variation.query().insert({
            productId: 3,
            imageUrl: "image",
            color_description: "Black",
            size: "M",
            quantity: 5,
            price: 19.99
        })
        await Variation.query().insert({
            productId: 3,
            imageUrl: "image",
            color_description: "Black",
            size: "L",
            quantity: 5,
            price: 19.99
        })
        await Variation.query().insert({
            productId: 3,
            imageUrl: "image",
            color_description: "Black",
            size: "XL",
            quantity: 5,
            price: 19.99
        })

        //Blanket
        await Variation.query().insert({
            productId: 4,
            imageUrl: "image",
            color_description: "Original",
            quantity: 5,
            price: 99.99
        })

        //Sweater
        await Variation.query().insert({
            productId: 5,
            imageUrl: "image",
            color_description: "Original",
            size: "One Size",
            quantity: 5,
            price: 49.99
        })

        //Plushie
        await Variation.query().insert({
            productId: 6,
            imageUrl: "image",
            color_description: "Original",
            quantity: 5,
            price: 6.99
        })

        //Head Band
        await Variation.query().insert({
            productId: 7,
            imageUrl: "image",
            color_description: "Original (Gray)",
            size: "S",
            quantity: 5,
            price: 8.99
        })
        await Variation.query().insert({
            productId: 7,
            imageUrl: "image",
            color_description: "Original (Gray)",
            size: "L",
            quantity: 5,
            price: 8.99
        })
        await Variation.query().insert({
            productId: 7,
            imageUrl: "image",
            color_description: "Red, Orange, Yellow",
            size: "S",
            quantity: 5,
            price: 8.99
        })
        await Variation.query().insert({
            productId: 7,
            imageUrl: "image",
            color_description: "Red, Orange, Yellow",
            size: "L",
            quantity: 5,
            price: 8.99
        })

        //Basket
        await Variation.query().insert({
            productId: 8,
            imageUrl: "image",
            color_description: "Original (White)",
            quantity: 5,
            price: 12.99
        })
        await Variation.query().insert({
            productId: 8,
            imageUrl: "image",
            color_description: "Yellow",
            quantity: 5,
            price: 12.99
        })
        await Variation.query().insert({
            productId: 8,
            imageUrl: "image",
            color_description: "Brown",
            quantity: 5,
            price: 12.99
        })

        //Jesus' Cross Mug
        await Variation.query().insert({
            productId: 9,
            imageUrl: "image",
            color_description: "Original",
            quantity: 5,
            price: 4.99
        })

        //Bible Quote Mug
        await Variation.query().insert({
            productId: 10,
            imageUrl: "image",
            color_description: "Original",
            quantity: 5,
            price: 4.99
        })
        await Variation.query().insert({
            productId: 10,
            imageUrl: "image",
            color_description: "Somewhat Original Idk",
            quantity: 5,
            price: 4.99
        })
        await Variation.query().insert({
            productId: 10,
            imageUrl: "image",
            color_description: "Not Original Help Me",
            quantity: 5,
            price: 4.99
        })
    }
}

export default VariationSeeder