import React from "react"

const ProductTile = (props) => {
    let image = "https://placehold.co/500x600"
    if (props.imageUrl != "image") {
        image = props.imageUrl
    }
    return (
        <a href={`/products/${props.id}`} className="cell product-tile">
            <img src={image} />
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