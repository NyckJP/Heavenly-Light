import { Product } from "../../models/index.js"

class ProductSeeder {
    static async seed() {
        await Product.query().delete()

        await Product.query().insert({
            name: "T-Shirt",
            imageUrl: "image",
            details: "Heavenly Light Logo",
            category: "Tops",
            price: 9.99
        })
        await Product.query().insert({
            name: "Hoodie",
            imageUrl: "image",
            details: "Large golden cross",
            category: "Tops",
            price: 14.99
        })
        await Product.query().insert({
            name: "Button Down",
            imageUrl: "image",
            category: "Tops",
            price: 19.99
        })

        await Product.query().insert({
            name: "Blanket",
            imageUrl: "image",
            details: "Queen Size - 90 inches x 100 inches",
            category: "Crochets",
            price: 99.99
        })
        await Product.query().insert({
            name: "Sweater",
            imageUrl: "image",
            details: "Pink, Yellow, Blue",
            category: "Crochets",
            price: 49.99
        })
        await Product.query().insert({
            name: "Plushie",
            imageUrl: "image",
            category: "Crochets",
            price: 6.99
        })
        await Product.query().insert({
            name: "Head Band",
            imageUrl: "image",
            category: "Crochets",
            price: 8.99
        })
        await Product.query().insert({
            name: "Basket",
            imageUrl: "image",
            category: "Crochets",
            price: 12.99
        })

        await Product.query().insert({
            name: "Jesus' Cross Mug",
            imageUrl: "image",
            category: "Mugs",
            price: 4.99
        })
        await Product.query().insert({
            name: "Bible Quote Mug",
            imageUrl: "image",
            details: "Jeremiah 29:11",
            category: "Mugs",
            price: 4.99
        })
    }
}

export default ProductSeeder