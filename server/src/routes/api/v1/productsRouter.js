import express from "express"
import { Product } from "../../../models/index.js"

const productsRouter = new express.Router()

productsRouter.get("/", async (req, res) => {
    try {
        const allProducts = await Product.query()
        return res.status(201).json({ products: allProducts })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

productsRouter.get("/:id", async (req, res) => {
    const { id } = req.params

    try {
        const singleProduct = await Product.query().findById(id)
        return res.status(201).json({ product: singleProduct })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

export default productsRouter