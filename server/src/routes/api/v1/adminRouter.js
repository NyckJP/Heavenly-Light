import express from "express"
import { Product } from "../../../models/index.js"

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
        singleProduct.variations = variations
        return res.status(200).json({ product: singleProduct })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

adminRouter.patch("/edit-product/:id", async (req, res) => {
    const { name, category, price, details } = req.body
    const { id } = req.params

    try {
        const editedProduct = await Product.query().patchAndFetchById( id, { name, category, price, details })
        return res.status(200).json({ product: editedProduct})
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

export default adminRouter