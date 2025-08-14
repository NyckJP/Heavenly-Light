import React, { useState, useEffect } from "react"

const VariationTile = ({ variation }) => {
    const [sizes, setSizes] = useState([])
    const [renderSizes, setRenderSizes] = useState(false)

    const getSizes = async () => {
        try {
            const response = await fetch(`/api/v1/admin/get-sizes/${variation.id}`)
            const parsedResponse = await response.json()
            setSizes(parsedResponse.sizes)
        } catch (error) {
            console.error(`Error in getSizes fetch: ${error.message}`)
        }
    }

    const handleRenderSizes = event => {
        event.preventDefault()
        setRenderSizes(!renderSizes)
    }

    useEffect(() => {
        getSizes()
    }, [])

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
                <h2>{variation.color}</h2>
            </section>
            <button className="button" onClick={handleRenderSizes}>Sizes and Quantities</button>
            {sizesList}
        </div>
    )
}

export default VariationTile