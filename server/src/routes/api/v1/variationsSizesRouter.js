import express from "express"
import { Variation } from "../../../models/index.js"

const variationsSizesRouter = new express.Router()

variationsSizesRouter.get("/:variationId", async (req, res) => {
    const { variationId } = req.params

    try {
        const variation = await Variation.query().findById(variationId)
        const sizes = await variation.$relatedQuery("sizes")
        const availableSizes = sizes.filter(size => size.quantity > 0)
        return res.status(200).json({ sizes: availableSizes })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

export default variationsSizesRouter