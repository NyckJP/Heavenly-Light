import React, { useState } from "react"
import FormError from "./../layout/FormError.js"

const CreateVariationForm = (props) => {
    const [newVariation, setNewVariation] = useState({imageUrl: "image", color: "", startingQuantity: 5})
    const [renderForm, setRenderForm] = useState(false)
    const [errors, setErrors] = useState({})

    const toggleRender = () => {
        setRenderForm(!renderForm)
    }

    const handleInputChange = event => {
        setNewVariation({
            ...newVariation,
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const validateInput = (variation) => {
        const { color } = variation
        let newErrors = {}

        if (color.trim() == '') {
            newErrors = { color: "is required" }
        } else if (props.variationsPayload.find(variation => variation.color == color)) {
            newErrors = { color: "cannot match another variation" }
        }

        return newErrors
    }

    const handleSubmit = event => {
        event.preventDefault()
        let newErrors = validateInput(newVariation)
        if (Object.keys(newErrors).length === 0) {
            props.setVariationsPayload([...props.variationsPayload, newVariation])
            setRenderForm(false)
            setNewVariation({...newVariation, color: "", startingQuantity: 5})
        }
        setErrors(newErrors)
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
                <FormError error={errors.color} />
            </label>
            <label>
                Starting Stock Quantity:
                <input type="number" name="startingQuantity" min="1" value={newVariation.startingQuantity} onChange={handleInputChange}/>
            </label>
            <button type="submit" className="button">Add Variation</button>
        </form>
    )
}

export default CreateVariationForm