import express from "express"
import { Product, Variation, Size } from "../../../models/index.js"
import uploadImage from "../../../services/uploadImage.js"

const  adminProductsRouter = new express.Router()

adminProductsRouter.get("/", async (req, res) => {
    try {
        const allProducts = await Product.query()
        return res.status(200).json({ products: allProducts })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

adminProductsRouter.get("/:id", async (req, res) => {
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

adminProductsRouter.patch("/edit/:id", async (req, res) => {
    const { name, category, price, description } = req.body
    const { id } = req.params

    try {
        const editedProduct = await Product.query().patchAndFetchById( id, { name, category, price, description })
        return res.status(200).json({ product: editedProduct})
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

adminProductsRouter.post("/new", uploadImage.array("images"), async (req, res) => {
    const product = JSON.parse(req.body.product)
    const variations = JSON.parse(req.body.variations)

    try {
        const newProduct = await Product.query().insertAndFetch({
            name: product.name, 
            imageUrl: req.files[0].location, 
            description: product.description,
            category: product.category,
            price: product.price
        })
        const sizes = ["Small", "Medium", "Large", "X-Large"]
        for (let i = 0; i < variations.length; i++) {
            const newVariation = await Variation.query().insertAndFetch({
                productId: newProduct.id,
                imageUrl: req.files[i].location,
                color: variations[i].color
            })
            for (const size of sizes) {
                await Size.query().insertAndFetch({
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

adminProductsRouter.delete("/delete/:id", async (req, res) => {
    const { id } = req.params

    try {
        await Product.query().deleteById(id)
        return res.status(204).json({})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

export default adminProductsRouter