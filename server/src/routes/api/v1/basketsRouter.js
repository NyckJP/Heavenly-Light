import express from "express"
import { Product, Size, BasketItem,  } from "../../../models/index.js"
import { raw } from "objection"

const basketsRouter = new express.Router()

basketsRouter.get("/", async (req, res) => {
    let guestId = req.session.guestId
    
    try {
        let basketItemIds = await BasketItem.query().where("guestId", "=", guestId)
        const basket = await Promise.all(basketItemIds.map(async item => {
            const foundSize = await Size.query().findById(item.sizeId)
            const foundVariation = await foundSize.$relatedQuery("variation")
            const foundProduct = await foundVariation.$relatedQuery("product")
            return { id: item.id, product: foundProduct, variation: foundVariation, size: foundSize, quantity: item.quantity }
        }))
        return res.status(200).json({ basket: basket })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

basketsRouter.get("/count", async (req, res) => {
    const guestId = req.session.guestId

    try {
        if(!guestId)
            return res.status(200).json({ basketCount: 0 })
        const basketItems = await BasketItem.query().where("guestId", "=", guestId)
        let basketCount = 0
        for(let i = 0; i < basketItems.length; i++) {
            basketCount += basketItems[i].quantity
        }
        return res.status(200).json({ basketCount: basketCount })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

basketsRouter.post("/", async (req, res) => {
    let guestId = req.session.guestId
    const { productId, basketItem } = req.body

    try {
        const product = await Product.query().findById(productId)
        const response = await product.$relatedQuery("variations").where("color", "=", basketItem.color)
        const foundVariation = response[0]
        const response2 = await foundVariation.$relatedQuery("sizes").where("size", "=", basketItem.size)
        const foundSize = response2[0]
        console.log(basketItem.size)

        const basketList = await BasketItem.query().where("guestId", "=", guestId)
        for(let i = 0; i < basketList.length; i++){
            if(basketList[i].sizeId == foundSize.id){
                const finalQuantity = parseInt(basketList[i].quantity) + parseInt(basketItem.quantity)
                if(finalQuantity > foundSize.quantity)
                    throw new Error('Maximum quantity reached')
                const updatedBasketItem = await BasketItem.query().patchAndFetchById(basketList[i].id, { quantity: raw('quantity + ?', basketItem.quantity) })
                return res.status(200).json({ updatedBasketItem: updatedBasketItem })
            }
        }

        let newBasketItem = await BasketItem.query().insertAndFetch({ guestId: guestId, sizeId: foundSize.id, quantity: basketItem.quantity })
        return res.status(201).json(newBasketItem)
    } catch (error) {
        console.log(error)
        if(error.message == 'Maximum quantity reached')
            return res.status(400).json({ errors: error.message })
        return res.status(500).json({ errors: error })
    }
})

basketsRouter.patch("/:id", async (req, res) => {
    const { id } = req.params
    const { change } = req.body

    try {
        const editedBasketItem = await BasketItem.query().patchAndFetchById(id, { quantity: raw('quantity + ?', change) })
        return res.status(200).json({ basketItem: editedBasketItem })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

basketsRouter.delete("/clear-basket", async (req, res) => {
    let guestId = req.session.guestId

    try {
        const basketList = await BasketItem.query().where("guestId", "=", guestId)
        for (let i = 0; i < basketList.length; i++) {
            const editedSizeQuantity = await Size.query().patchAndFetchById(basketList[i].sizeId, { quantity: raw('quantity - ?', basketList[i].quantity) })
        }
        const deletedBasket = await BasketItem.query().where("guestId", "=", guestId).delete()
        return res.status(204).json({})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

basketsRouter.delete("/:basketItemId", async (req, res) => {
    const { basketItemId } = req.params

    try {
        const deletedBasketItem = await BasketItem.query().deleteById(basketItemId)
        return res.status(204).json({})
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

export default basketsRouter