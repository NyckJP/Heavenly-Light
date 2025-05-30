import React from "react"

const ProductTile = (props) => {
    return (
        <a href={`/products/${props.id}`} className="cell product-tile">
            <img src="https://placehold.it/500x600" />
            <h3>
                {props.name}
            </h3>
            <h6>
                ${props.price}
            </h6>
        </a>
    )
}

export default ProductTile