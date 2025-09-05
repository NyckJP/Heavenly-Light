import React from "react"

const NewVariationTile = (props) => {
    const deleteNewVariation = () => {
        let newVariationsList = [...props.variationsPayload]
        const newVariationIndex = newVariationsList.findIndex(variation => variation.color == props.color)
        newVariationsList.splice(newVariationIndex, 1)
        props.setVariationsPayload(newVariationsList)
    }

    return (
        <div className="cell medium-4 small-6 new-variation-tile">
            <img src="https://placehold.co/500x600" />
            <p>Color/Description: {props.color}</p>
            <p>Starting Stock Quantity: {props.startingQuantity}</p>
            <button className="button" onClick={deleteNewVariation}>Remove Variation</button>
        </div>
    )
}

export default NewVariationTile