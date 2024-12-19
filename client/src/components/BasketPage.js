import React, { useState, useEffect } from "react"
import BasketItem from "./BasketItem.js"

const BasketPage = () => {
    const [basketList, setBasketList] = useState([])
    const [total, setTotal] = useState(0.01)

    const getTotal = (basket) =>  {
        if (!basket || basket.length == 0)
            return
        let total = 0
        basket.forEach(item => {
            console.log(item)
            total += parseFloat(item.variation.price) * item.quantity
        })
        setTotal(total)
    }

    const getBasket = async () => {
        try {
            const response = await fetch('/api/v1/baskets')
            const parsedResponse = await response.json()
            setBasketList(parsedResponse.basket)
            getTotal(parsedResponse.basket)
        } catch (error) {
            console.log(`Error in getBasket fetch: ${error}`)
        }
    }

    useEffect(() => {
        getBasket()
    }, [])

    let key = 0
    const renderedBasket = basketList?.map(item => {
        key++
        return (
            <BasketItem 
                key = {key}
                variationId={item.variation?.id}
                productId={item.variation?.productId}
                imageUrl={item.variation?.imageUrl}
                color_description={item.variation?.color_description}
                size={item.variation?.size}
                quantity={item?.quantity}
            />
        )
    })

    return (
        <div className="grid-container basket-page">
            <div className="products-header">
                <h1>Your Heavenly Basket</h1>
                <a href="/#products">Continue Shopping</a>
            </div>
            <hr />
            <div>{renderedBasket}</div>
            <div className="subtotal">
                <h4>Subtotal: ${total}</h4>
                <input className="button" defaultValue="Checkout"/>
            </div>
        </div>
    )
}

export default BasketPage