import express from "express"
import { Variation } from "../../../models/index.js"
import variationsSizesRouter  from "./variationsSizesRouter.js"

const variationRouter = new express.Router()

variationRouter.get("/:productId", async (req, res) => {
    const { productId } = req.params
    
    try {
        const allVariations = await Variation.query().where("productId", "=", productId)
        const allAvailableVariations = await (async () => {
            const availableVariations = []
            for (const variation of allVariations) {
                const sizes = await variation.$relatedQuery("sizes")
                let totalQuantity = 0
                sizes.forEach(size => {
                    totalQuantity += size.quantity
                })
                if (totalQuantity > 0) {
                    availableVariations.push(variation)
                }
            }
            return availableVariations
        })()
        return res.status(200).json({ variations: allAvailableVariations })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

variationRouter.use('/sizes', variationsSizesRouter)

export default variationRouter