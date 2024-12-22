import React, { useState, useEffect } from "react"
import BasketItem from "./BasketItem.js"

const BasketPage = () => {
    const [basketList, setBasketList] = useState([])
    const [total, setTotal] = useState(0.01)

    const getTotal = (basket) =>  {
        if (!basket || basket.length == 0)
            return setTotal("0.00")
        let total = 0
        basket.forEach(item => {
            total += parseFloat(item.variation.price) * item.quantity
        })
        total = Number(total.toFixed(2))
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

    const deleteItem = async (basketItemId) => {
        try {
            const response = await fetch(`/api/v1/baskets/${basketItemId}`, {
                method: "delete",
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })
            const newBasketList = basketList.filter(basketItem => basketItem.id != basketItemId)
            console.log(newBasketList)
            setBasketList(newBasketList)
            getTotal(newBasketList)
        } catch (error) {
            console.log(`Error in delete fetch: ${error.message}`)
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
                id={item.id}
                variationId={item.variation?.id}
                productId={item.variation?.productId}
                imageUrl={item.variation?.imageUrl}
                color_description={item.variation?.color_description}
                size={item.variation?.size}
                quantity={item?.quantity}
                basketList={basketList}
                deleteItem={deleteItem}
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