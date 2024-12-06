import React, { useState, useEffect } from "react"
import BasketItem from "./BasketItem.js"

const BasketPage = () => {
    const [basketList, setBasketList] = useState([])

    const getBasket = async () => {
        try {
            const response = await fetch('/api/v1/baskets')
            const parsedResponse = await response.json()
            console.log(parsedResponse)
            setBasketList(parsedResponse.basket)
        } catch (error) {
            console.log(`Error in getBasket fetch: ${error}`)
        }
    }

    useEffect(() => {
        getBasket()
    }, [])

    let keyNumber = 0
    const renderedBasket = basketList?.map(item => {
        keyNumber++
        return (
            <BasketItem 
                key = {keyNumber}
                variationId={item.variation.id}
                productId={item.variation.productId}
                imageUrl={item.variation.imageUrl}
                color_description={item.variation.color_description}
                size={item.variation.size}
                quantity={item.quantity}
            />
        )
    })

    return (
        <div>{renderedBasket}</div>
    )
}

export default BasketPage