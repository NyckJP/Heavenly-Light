import { Variation } from "../../models/index.js"

class VariationSeeder {
    static async seed() {
        await Variation.query().delete()

        const firstItemVariations = ["White", "Black", "Blue", "Red"]
        const secondItemVariations = ["White", "Black", "Gray"]
        const thirdItemVariations = ["White", "Black", "Red", "Orange", "Yellow"]
        const fourthItemVariations = ["Black", "Navy", "Green Camo", "Brown with Highlights"]
        const fifthItemVariations = ["Black and White", "White and Black"]
        const sixthItemVariations = ["Tangerine Skies", "Grape Skies", "Blueberry Skies"]
        const seventhItemVariations = ["Pink", "Purple"]
        const eighthItemVariations = ["White"]

        const allVariations = [
            firstItemVariations,
            secondItemVariations,
            thirdItemVariations,
            fourthItemVariations,
            fifthItemVariations,
            sixthItemVariations,
            seventhItemVariations,
            eighthItemVariations
        ]
        
        for(let i = 0; i  < allVariations.length; i++) {
            allVariations[i].forEach(async variation => {
                await Variation.query().insert({
                    productId: i+1,
                    imageUrl: "image",
                    color: variation
                })
            })
        }
    }
}

export default VariationSeeder