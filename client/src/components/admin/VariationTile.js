import React, { useState } from "react"

const VariationTile = ({ sizes }) => {
    const [renderSizes, setRenderSizes] = useState(false)
    console.log(sizes)

    const handleRenderSizes = event => {
        event.preventDefault()
        setRenderSizes(!renderSizes)
    }

    let sizesList
    if(renderSizes){
        sizesList = sizes.map(size => {
            return (
                <div className="size-container">
                    <h6>{size.size}</h6>
                    <h6>{size.quantity}</h6>
                </div>
            )
        })
    }

    return (
        <div className="variation-tile">
            <section>
                <img src="https://placehold.co/500x600" />
                <h2>{sizes[0].color_description}</h2>
            </section>
            <input className="button" value="Sizes and Quantities" onClick={handleRenderSizes}/>
            {sizesList}
        </div>
    )
}

export default VariationTile