import React from "react"

const NewVariationTile = (props) => {
    return (
        <div className="cell medium-4 small-6 new-variation-tile">
            <img src="https://placehold.co/500x600" />
            <p>Color/Description: {props.color}</p>
            <p>Starting Stock Quantity: {props.startingQuantity}</p>
        </div>
    )
}

export default NewVariationTile