import React, { useState, useEffect } from "react"
import EditField from "./EditField.js"
import EditStockField from "./EditStockField.js"

const VariationTile = ({ variation, updateVariation }) => {
    const [sizes, setSizes] = useState([])
    const [renderSizes, setRenderSizes] = useState(false)

    const getSizes = async () => {
        try {
            const response = await fetch(`/api/v1/admin/get-sizes/${variation.id}`)
            const parsedResponse = await response.json()
            setSizes(parsedResponse.sizes.toSorted((a, b) => a.id - b.id))
        } catch (error) {
            console.error(`Error in getSizes fetch: ${error.message}`)
        }
    }

    const editVariationColor = async (payload) => {
        try {
            const response = await fetch(`/api/v1/admin/edit-variation/${variation.id}`, {
                method: "PATCH",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({ editedColor: payload })
            })
            if (!response.ok) {
                throw new Error(`${response.status} (${response.statusText})`)
            } else {
                await updateVariation()
            }
        } catch (error) {
            console.error(`Error in editVariationColor fetch: ${error.message}`)
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
        let key = 0
        sizesList = sizes.map(size => {
            key++
            return (
                <div key={key} className="size-container">
                    <h6>{size.size}</h6>
                    <EditStockField id={size.id} quantity={size.quantity} />
                </div>
            )
        })
    }

    return (
        <div className="variation-tile">
            <section>
                <img src="https://placehold.co/500x600" />
                <EditField 
                    text={variation.color}
                    part="color"
                    editProduct={editVariationColor}
                />
            </section>
            <button className="button" onClick={handleRenderSizes}>Sizes and Quantities</button>
            {sizesList}
        </div>
    )
}

export default VariationTile