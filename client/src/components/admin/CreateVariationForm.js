import React, { useState } from "react"

const CreateVariationForm = (props) => {
    const [newVariation, setNewVariation] = useState({imageUrl: "image", color: "", startingQuantity: 5})
    const [renderForm, setRenderForm] = useState(false)

    const toggleRender = () => {
        setRenderForm(!renderForm)
    }

    const handleInputChange = event => {
        setNewVariation({
            ...newVariation,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault()
        props.setVariationsPayload([...props.variationsPayload, newVariation])
        setRenderForm(false)
        setNewVariation({...newVariation, color: "", startingQuantity: 5})
    }

    if(!renderForm) {
        return (
            <h3 className="create-variation-form" onClick={toggleRender}>+ Add a Variation</h3>
        )
    }
    return (
        <form className="create-variation-form" onSubmit={handleSubmit}>
            <h3 onClick={toggleRender}>+ Add a Variation</h3>
            <label>
                Color/Description:
                <input type="text" name="color" value={newVariation.color} onChange={handleInputChange}/>
            </label>
            <label>
                Starting Stock Quantity:
                <input type="number" name="startingQuantity" value={newVariation.startingQuantity} onChange={handleInputChange}/>
            </label>
            <button type="submit" className="button">Add Variation</button>
        </form>
    )
}

export default CreateVariationForm