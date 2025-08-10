import React, { useState, useEffect } from "react"
import QuantityStepper from "./QuantityStepper.js"

const BasketItem = (props) => {
    const [product, setProduct] = useState({name: ""})

    const getProduct = async () => {
        try {
            if(!props.productId){
                return
            }
            const response = await fetch(`/api/v1/products/${props.productId}`)
            const parsedResponse = await response.json()
            setProduct(parsedResponse.product)
        } catch (error) {
            console.log(`Error in single product fetch: ${error}`)
        }
    }

    const handleDelete = event => {
        event.preventDefault()
        props.deleteItem(props.id)
    }

    useEffect(() => {
        getProduct()
    }, [props.basketList])

    return (
        <div className="basket-item">
            <img src="https://placehold.co/500x600" />
            <section className="item-details">
                <h4>{product.name}</h4>
                <div>{props.color} </div>
                <div>{props.size} </div>
                <div>${product.price} </div>
            </section>
            <QuantityStepper 
                basketItemId={props.id} 
                quantity={props.quantity} 
                maxQuantity={props.maxQuantity} 
                changeQuantity={props.changeQuantity} 
                basketList={props.basketList}
            />
            <section className="item-price">
                <h4>{(product.price * props.quantity).toLocaleString('en-US', { style: 'currency', currency: 'USD'})}</h4>
                <input className="button delete-button" defaultValue="Remove Item" onClick={handleDelete}/>
            </section>
        </div>
    )
}

export default BasketItem