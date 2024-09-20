import React from "react";

const ProductTile = (props) => {
    return (
        <>
            <div>
                image: {props.imageUrl}
            </div>
            <div>
                name: {props.name}
            </div>
            <div>
                price: ${props.price}
            </div>
        </>
    )
}

export default ProductTile