import React, { useState, useEffect } from "react"
import BasketItem from "./BasketItem.js"

const BasketPage = (props) => {
    const [basketList, setBasketList] = useState([])
    const [total, setTotal] = useState("$0.00")

    const getTotal = (basket) =>  {
        if (!basket || basket.length == 0)
            return setTotal("$0.00")
        let total = 0
        basket.forEach(item => {
            total += parseFloat(item.variation.price) * item.quantity
        })
        setTotal(total.toLocaleString('en-US', { style: 'currency', currency: 'USD'}))
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
            setBasketList(newBasketList)
            getTotal(newBasketList)
            props.getBasketCount()
        } catch (error) {
            console.log(`Error in delete fetch: ${error.message}`)
        }
    }
    
    const changeQuantity = async (basketItemId, change) => {
        try {
            const response = await fetch(`/api/v1/baskets/${basketItemId}`, {
                method: 'PATCH',
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({ change: change })
            })
            const parsedResponse = await response.json()
            let newBasketList = basketList
            for(let i = 0; i < newBasketList.length; i++){
                if(newBasketList[i].id == basketItemId) {
                    newBasketList[i].quantity += change
                }
            }
            setBasketList(newBasketList)
            getTotal(newBasketList)
            props.getBasketCount()
            return parsedResponse.basketItem.quantity
        } catch (error) {
            console.log(`Error in change quantity fetch: ${error}`)
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
                maxQuantity={item.variation?.quantity}
                basketList={basketList}
                deleteItem={deleteItem}
                changeQuantity={changeQuantity}
            />
        )
    })

    let renderBasketList
    if(basketList.length == 0){
        renderBasketList = (
            <div className="empty-message">
                <h3>You have nothing in your basket</h3>
                <a href="/#products" className="button">Continue Shopping</a>
            </div>
        )
    } else {
        renderBasketList = (
            <>
                <div>{renderedBasket}</div>
                <div className="subtotal-section">
                    <div className="subtotal-container">
                        <div className="subtotal">
                            <h4>Subtotal:</h4>
                            <h4>{total}</h4>
                        </div>
                        <input className="button" defaultValue="Checkout" />
                    </div>
                </div>
            </>
        )
    }

    return (
        <div className="grid-container basket-page">
            <div className="products-header">
                <h1>Your Heavenly Basket</h1>
                <a href="/#products">Continue Shopping</a>
            </div>
            <hr />
            {renderBasketList}
        </div>
    )
}

export default BasketPage