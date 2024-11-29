import express from "express"
import { User, Variation, BasketItem } from "../../../models/index.js"

const basketRouter = new express.Router()

basketRouter.get("/", async (req, res) => {
    const userId = req.user.id
    let guestId = req.session.guestId
    
    try {
        let basketItemIds
        if(userId){
            const currentUser = await User.query().findById(userId)
            basketItemIds = await currentUser.$relatedQuery("basketItems")
        } else {
            basketItemIds = await BasketItem.query().where("userId", "=", guestId)
        }
        const basket = basketItemIds.forEach(async item => {
            const foundVariation = await Variation.query().findById(item.id)
            return { variation: foundVariation, quantity: item.quantity}
        })
        res.status(200).json({ basket: basket })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

basketRouter.post("/", async (req, res) => {
    const userId = req.user.id
    let guestId = req.session.guestId
    const { body } = req // {color_description, size, quantity}
    try {
        const foundVariant = await Variation.query().where("color_description", "=", body.color_description).andWhere("size", "=", body.size)
        console.log(foundVariant)
        let newBasketItem
        if(userId){
            newBasketItem = await BasketItem.query().insertAndFetch({ userId: userId, variantId: foundVariant.id, quantity: body.quantity })
        } else {
            newBasketItem = await BasketItem.query().insertAndFetch({ userId: guestId, variantId: foundVariant.id, quantity: body.quantity })
        }
        console.log(newBasketItem)
        res.status(201) //see if .json() is necessary
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

export default basketRouter