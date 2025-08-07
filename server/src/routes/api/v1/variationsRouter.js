import express from "express"
import { Variation } from "../../../models/index.js"
import variationsSizesRouter  from "./variationsSizesRouter.js"

const variationRouter = new express.Router()

variationRouter.get("/:productId", async (req, res) => {
    const { productId } = req.params
    
    try {
        const allVariations = await Variation.query().where("productId", "=", productId)
        //filter allVariations
            //loop through sizes
                //if totalQuantity > 0, pass it through to allAvailableVariations
        return res.status(200).json({ variations: allVariations })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

variationRouter.use('/sizes', variationsSizesRouter)

export default variationRouter