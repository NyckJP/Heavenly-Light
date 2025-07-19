import { Variation, Size } from "../../models/index.js"

class SizeSeeder {
    static async seed() {
        await Size.query().delete()

        const allVariations = await Variation.query()
        allVariations.forEach(variation => {
            const sizes = ["Small", "Medium", "Large", "X-Large"]
            sizes.forEach(async size => {
                await Size.query().insert({
                    variationId: variation.id,
                    size: size,
                    quantity: 5
                })
            })
        })
    }
}

export default SizeSeeder 