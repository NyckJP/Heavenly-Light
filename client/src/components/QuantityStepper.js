import React, { useState, useEffect } from "react"

const QuantityStepper = (props) => {
    const [quantity, setQuantity] = useState()

    const decrementQuantity = async () => {
        if(quantity == 1)
            return
        const newQuantity = await props.changeQuantity(props.basketItemId, -1)
        setQuantity(newQuantity)
    }
    const incrementQuantity = async () => {
        if(quantity == props.maxQuantity){
            alert("Maximum Quantity Reached")
            return
        }
        const newQuantity = await props.changeQuantity(props.basketItemId, 1)
        setQuantity(newQuantity)
    }
    
    useEffect(() => {
        setQuantity(props.quantity)
    }, [props.basketList])

    return (
        <div className="quantity-stepper">
            <p className="stepper-button" onClick={decrementQuantity}> - </p>
            <p>{quantity}</p> 
            <p className="stepper-button" onClick={incrementQuantity}> + </p>
        </div>
    )
}

export default QuantityStepper