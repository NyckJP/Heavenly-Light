import { Product } from "../../models/index.js"

class ProductSeeder {
    static async seed() {
        await Product.query().delete()

        //Both Men and Women
        await Product.query().insert({
            name: "Heavenly T-Shirt",
            imageUrl: "image",
            description: "Heavenly Light Logo",
            category: "Both",
            price: 9.99
        })
        await Product.query().insert({
            name: "Heavenly Hoodie",
            imageUrl: "image",
            description: "Heavenly Light Logo",
            category: "Both",
            price: 14.99
        })
        await Product.query().insert({
            name: "Heavenly Sweatshirt",
            imageUrl: "image",
            description: "Heavenly Light Logo",
            category: "Both",
            price: 12.99
        })
        
        //Men
        await Product.query().insert({
            name: "Mens Hoodie",
            imageUrl: "image",
            description: "Christian Warrior Imagery",
            category: "Men",
            price: 14.99
        })
        await Product.query().insert({
            name: "Bible Quote T-Shirt",
            imageUrl: "image",
            description: "Jeremiah 29:11",
            category: "Men",
            price: 10.99
        })

        //Women
        await Product.query().insert({
            name: "Womens Sweatshirt",
            imageUrl: "image",
            description: "Jesus' Cross in the Distance",
            category: "Women",
            price: 12.99
        })
        await Product.query().insert({
            name: "Jesus' Love T-Shirt",
            imageUrl: "image",
            description: "idk",
            category: "Women",
            price: 7.99
        })
        await Product.query().insert({
            name: "Bible Quote Hoodie",
            imageUrl: "image",
            description: "Psalm 9:10",
            category: "Women",
            price: 16.99
        })
    }
}

export default ProductSeeder