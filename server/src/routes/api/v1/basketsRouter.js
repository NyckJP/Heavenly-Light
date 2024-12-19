import express from "express"
import { User, Variation, BasketItem, Product } from "../../../models/index.js"

const basketsRouter = new express.Router()

basketsRouter.get("/", async (req, res) => {
    const userId = req.user?.id
    let guestId = req.session.guestId
    
    try {
        let basketItemIds
        if(userId){
            const currentUser = await User.query().findById(userId)
            basketItemIds = await currentUser.$relatedQuery("basketItems")
        } else {
            basketItemIds = await BasketItem.query().where("guestId", "=", guestId)
        }
        const basket = await Promise.all(basketItemIds.map(async item => {
            const foundVariation = await Variation.query().findById(item.variationId)
            return { variation: foundVariation, quantity: item.quantity }
        }))
        res.status(200).json({ basket: basket })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})
basketsRouter.post("/", async (req, res) => {
    const userId = req.user?.id
    let guestId = req.session.guestId
    const { productId, basketItem } = req.body

    try {
        const product = await Product.query().findById(productId)
        const response = await product.$relatedQuery("variations").where("color_description", "=", basketItem.color_description).andWhere("size", "=", basketItem.size)
        const foundVariation = response[0]
        let newBasketItem
        if(userId){
            newBasketItem = await BasketItem.query().insertAndFetch({ userId: userId, variationId: foundVariation.id, quantity: basketItem.quantity })
        } else {
            newBasketItem = await BasketItem.query().insertAndFetch({ guestId: guestId, variationId: foundVariation.id, quantity: basketItem.quantity })
        }
        res.status(201).json(newBasketItem)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

export default basketsRouter