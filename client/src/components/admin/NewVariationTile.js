import React, { useEffect, useState } from "react"

const NewVariationTile = (props) => {
    const [imagePreview, setImagePreview] = useState("")
    
    const deleteNewVariation = () => {
        let newVariationsList = [...props.variationsPayload]
        const newVariationIndex = newVariationsList.findIndex(variation => variation.color == props.color)
        newVariationsList.splice(newVariationIndex, 1)
        props.setVariationsPayload(newVariationsList)
    }

    useEffect(() => {
        setImagePreview(URL.createObjectURL(props.image))
    }, [props.variationsPayload])

    return (
        <div className="cell medium-4 small-6 new-variation-tile">
            <img className="img-preview" src={imagePreview} />
            <p>Color/Description: {props.color}</p>
            <p>Stocked Quantity: {props.startingQuantity}</p>
            <button className="button" onClick={deleteNewVariation}>Remove Variation</button>
        </div>
    )
}

export default NewVariationTile