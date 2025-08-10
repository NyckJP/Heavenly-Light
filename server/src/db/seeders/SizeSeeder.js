import { Variation, Size } from "../../models/index.js"

class SizeSeeder {
    static async seed() {
        await Size.query().delete()

        const allVariations = await Variation.query()  
        const sizes = ["Small", "Medium", "Large", "X-Large"]
        for(let i = 0; i < allVariations.length; i++) {
            for(let j = 0; j < sizes.length; j++){
                await Size.query().insert({
                    variationId: allVariations[i].id,
                    size: sizes[j],
                    quantity: Math.floor(Math.random() * 10)
                })
            }
        }
    }
}

export default SizeSeeder 