import React, { useState, useEffect } from "react"

const BasketItem = (props) => {
    return (
        <>
            <div>{props.color_description}</div>
            <div>{props.size}</div>
            <div>{props.quantity}</div>
        </>
    )
}

export default BasketItem