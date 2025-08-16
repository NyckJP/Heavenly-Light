import express from "express"
import { Product, Variation } from "../../../models/index.js"

const adminRouter = new express.Router()

adminRouter.get("/all-products", async (req, res) => {
    try {
        const allProducts = await Product.query()
        return res.status(200).json({ products: allProducts })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

adminRouter.get("/get-product/:id", async (req, res) => {
    const { id } = req.params

    try {
        const singleProduct = await Product.query().findById(id)
        const variations = await singleProduct.$relatedQuery("variations")
        return res.status(200).json({ product: singleProduct, variations: variations })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

adminRouter.get("/get-sizes/:id", async (req, res) => {
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

adminRouter.patch("/edit-product/:id", async (req, res) => {
    const { name, category, price, description } = req.body
    const { id } = req.params

    try {
        const editedProduct = await Product.query().patchAndFetchById( id, { name, category, price, description })
        return res.status(200).json({ product: editedProduct})
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

adminRouter.patch("/edit-variation/:id", async (req, res) => {
    const { editedColor } = req.body
    const { id } = req.params

    try {
        const editedVariation = await Variation.query().patchAndFetchById( id, { color: editedColor })
        return res.status(200).json({ editedVariation: editedVariation})
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

export default adminRouter