import express from "express"
import { Variation, Size } from "../../../models/index.js"

const adminSizesRouter = new express.Router()

adminSizesRouter.get("/:id", async (req, res) => {
    const { id } = req.params

    try {
        const singleVariation = await Variation.query().findById(id)
        const sizes = await singleVariation.$relatedQuery("sizes")
        return res.status(200).json({ sizes: sizes })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

adminSizesRouter.patch("/edit-stock/:id", async (req, res) => {
    const { newQuantity } = req.body
    const { id } = req.params

    try {
        const editedSize = await Size.query().patchAndFetchById( id, { quantity: newQuantity })
        return res.status(200).json({ editedSize: editedSize })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

export default adminSizesRouter