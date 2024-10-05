import express from "express"
import { Variation } from "../../../models/index.js"

const variationRouter = new express.Router()

variationRouter.get("/:productId", async (req, res) => {
    const { productId } = req.params

    try {
        const allVariations = await Variation.query().where("productId", "=", productId)
        return res.status(201).json({ variations: allVariations })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

export default variationRouter