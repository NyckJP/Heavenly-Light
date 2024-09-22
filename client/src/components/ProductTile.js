import React from "react";

const ProductTile = (props) => {
    return (
        <div className="cell">
            {/* <div>
                image: {props.imageUrl}
            </div> */}
            <img src="https://placehold.it/500x600" />
            <h3>
                {props.name}
            </h3>
            <h6>
                ${props.price}
            </h6>
        </div>
    )
}

export default ProductTile