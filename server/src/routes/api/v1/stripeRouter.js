import express from "express"
import { Variation, BasketItem, Product } from "../../../models/index.js"
import formatUSDToDigits from "../../../services/formatUSDToDigits.js"
import Stripe from "stripe"
import dotenv from "dotenv"
dotenv.config();

const stripe = Stripe(process.env.STRIPE_KEY)

const stripeRouter = new express.Router()

stripeRouter.post("/create_checkout_session", async (req, res) => {
    let guestId = req.session.guestId

    try {
        let basketItemIds = await BasketItem.query().where("guestId", "=", guestId)
        const lineItems = await Promise.all(basketItemIds.map(async item => {
            const foundVariation = await Variation.query().findById(item.variationId)
            const foundProduct = await Product.query().findById(foundVariation.productId)
            const product = await stripe.products.create({ 
                name: foundProduct.name, 
                description: foundVariation.size + ', The item description' 
            })
            const price = await stripe.prices.create({
                product: product.id,
                unit_amount: formatUSDToDigits(foundVariation.price),
                currency: 'usd',
            })
            return { price: price.id, quantity: item.quantity }
        }))

        // const prices = await stripe.products.list()
        // console.log(prices.data)
        if (lineItems.length == 0)
            throw new Error('No basket items found')

        const session = await stripe.checkout.sessions.create({
            ui_mode: 'embedded',
            line_items: lineItems,
            shipping_address_collection: {
                allowed_countries: ['US', 'CA'],
            },
            mode: 'payment',
            return_url: `http://localhost:3000/return?session_id={CHECKOUT_SESSION_ID}`
        })

        res.status(201).json({clientSecret: session.client_secret})
    } catch (error) {
        console.log(error)
        if(error.message == 'No basket items found')
            return res.status(404).json({errors: error.message})
        return res.status(500).json({ errors: error })
    }
})

stripeRouter.get("/session-status", async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.query.session_id)

    res.status(200).json({
        status: session.status,
        customer_email: session.customer_details.email
    })
})

export default stripeRouter