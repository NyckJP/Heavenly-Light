import express from "express"
import { Product, Variation, Size } from "../../../models/index.js"

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

adminRouter.patch("/edit-stock/:id", async (req, res) => {
    const { newQuantity } = req.body
    const { id } = req.params

    try {
        const editedSize = await Size.query().patchAndFetchById( id, { quantity: newQuantity })
        return res.status(200).json({ editedSize: editedSize })
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

adminRouter.post("/", async (req, res) => {
    const { product, variations} = req.body
    console.log(product)

    try {
        const newProduct = await Product.query().insertAndFetch({
            name: product.name, 
            imageUrl: "image", 
            description: product.description,
            category: product.category,
            price: product.price
        })
        const sizes = ["Small", "Medium", "Large", "X-Large"]
        for (let i = 0; i < variations.length; i++) {
            const newVariation = await Variation.query().insertAndFetch({
                productId: newProduct.id,
                imageUrl: "image",
                color: variations[i].color
            })
            for (const size of sizes) {
                const variationSize = await Size.query().insertAndFetch({
                    variationId: newVariation.id,
                    size: size,
                    quantity: variations[i].startingQuantity
                })
            }
        }
        return res.status(200).json({ newProduct: newProduct })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

export default adminRouter