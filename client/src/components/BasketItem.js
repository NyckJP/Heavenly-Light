import React, { useState, useEffect } from "react"

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

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <div className="basket-item">
            <img src="https://placehold.it/500x600" />
            <section className="item-details">
                <h4>{product.name}</h4>
                <div>color: {props.color_description} </div>
                <div>size: {props.size} </div>
                <div>price: {product.price} </div>
            </section>
            <div className="quantity-stepper">quantity: {props.quantity} </div>
            <section>
                <h4>Price: ${product.price * props.quantity}</h4>
            </section>
        </div>
    )
}

export default BasketItem