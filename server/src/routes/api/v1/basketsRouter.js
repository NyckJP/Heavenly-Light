import express from "express"
import { User, Variation, BasketItem } from "../../../models/index.js"

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
            const foundVariation = await Variation.query().findById(item.id)
            return { variation: foundVariation, quantity: item.quantity }
        }))
        console.log(basket)
        res.status(200).json({ basket: await basket })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

basketsRouter.post("/", async (req, res) => {
    const userId = req.user?.id
    let guestId = req.session.guestId
    const { body } = req // {color_description, size, quantity}
    try {
        const response = await Variation.query().where("color_description", "=", body.color_description).andWhere("size", "=", body.size)
        const foundVariant = response[0]
        let newBasketItem
        if(userId){
            newBasketItem = await BasketItem.query().insertAndFetch({ userId: userId, variationId: foundVariant.id, quantity: body.quantity })
        } else {
            newBasketItem = await BasketItem.query().insertAndFetch({ guestId: guestId, variationId: foundVariant.id, quantity: body.quantity })
        }
        console.log(newBasketItem)
        res.status(201).json(newBasketItem)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

export default basketsRouter