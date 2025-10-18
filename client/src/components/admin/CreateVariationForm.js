import React, { useState } from "react"
import Dropzone from "react-dropzone"
import FormError from "./../layout/FormError.js"

const CreateVariationForm = (props) => {
    const [newVariation, setNewVariation] = useState({image: {}, preview: "", color: "", startingQuantity: 5})
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

    const handleImageUpload = acceptedImage => {
        setNewVariation({
            ...newVariation,
            image: acceptedImage[0],
            preview: URL.createObjectURL(acceptedImage[0])
        })
    }

    const validateInput = (variation) => {
        const { image, color } = variation
        let newErrors = {}
        
        if (color.trim() == '') {
            newErrors = { color: "is required" }
        } else if (props.variationsPayload.find(variation => variation.color == color)) {
            newErrors = { color: "cannot match another variation" }
        }

        if (Object.keys(image).length === 0) {
            newErrors = {
                ...newErrors, 
                image: "image is required"
            }
        }

        return newErrors
    }

    const handleSubmit = event => {
        event.preventDefault()
        let newErrors = validateInput(newVariation)
        if (Object.keys(newErrors).length === 0) {
            props.setVariationsPayload([...props.variationsPayload, newVariation])
            setRenderForm(false)
            setNewVariation({...newVariation, image: {}, preview:"", color: "", startingQuantity: 5})
        }
        setErrors(newErrors)
    }

    let imagePreview
    if(newVariation.preview != ""){
        imagePreview = <img className="img-preview" src={newVariation.preview} />
    }

    if(!renderForm) {
        return (
            <h3 className="create-variation-form" onClick={toggleRender}>+ Add a Variation</h3>
        )
    }

    return (
        <form className="create-variation-form" onSubmit={handleSubmit}>
            <h3 onClick={toggleRender}>+ Add a Variation</h3>
            <Dropzone onDrop={handleImageUpload}>
                {({getRootProps, getInputProps}) => (
                    <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <p>Drop File or Click to Upload</p>
                        </div>
                    </section>
                )}
            </Dropzone>
            {imagePreview}
            <FormError error={errors.image} />
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