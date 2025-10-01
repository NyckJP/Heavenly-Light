import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import CreateVariationForm from "./CreateVariationForm.js"
import NewVariationTile from "./NewVariationTile.js"
import FormError from "./../layout/FormError.js"

const CreateProductPage = () => {
    const [productPayload, setProductPayload] = useState({ name: "", category: "", description: "", price: ""})
    const [variationsPayload, setVariationsPayload] = useState([])
    const [errors, setErrors] = useState({})
    const [shouldRedirect, setShouldRedirect] = useState(false)

    const handleProductInputChange = event => {
        setProductPayload({
            ...productPayload, 
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const validateInput = (product, variationList) => {
        const { name, category, price } = product
        let newErrors = {}

        if (name.trim() == '') {
            newErrors = { name: "a name is required" }
        }
        if (category.trim() == '') {
            newErrors = { 
                ...newErrors,
                category: "a category is required" 
            }
        }
        if (price.trim() == '') {
            newErrors = { 
                ...newErrors, 
                price: "a price is required" 
            }
        }
        if (variationList.length == 0) {
            newErrors = {
                ...newErrors,
                variations: "at least 1 is required"
            }
        }

        return newErrors
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            let newErrors = validateInput(productPayload, variationsPayload)
            if (Object.keys(newErrors).length === 0) {
                const payloadBody = new FormData()
                payloadBody.append("product", JSON.stringify(productPayload))
                payloadBody.append("variations", JSON.stringify(variationsPayload))
                for (const variation of variationsPayload) {
                    payloadBody.append("images", variation.image)
                }
                const response = await fetch("/api/v1/admin", {
                    method: "POST",
                    headers: new Headers({
                        "Accept": "image/jpeg"
                    }),
                    body: payloadBody
                })
                setShouldRedirect(true)
            } else {
                setErrors(newErrors)
            }
        } catch (error) {
            console.error(`Error in product handleSubmit fetch: ${error.message}`)
        }
    }

    let key = 0
    const renderNewVariations = variationsPayload.map(variation => {
        key++
        return (
            <NewVariationTile 
                key={key}
                image={variation.image}
                color={variation.color} 
                startingQuantity={variation.startingQuantity} 
                variationsPayload={variationsPayload}
                setVariationsPayload={setVariationsPayload}
            />
        )
    })

    if (shouldRedirect) {
        return <Redirect push to="/manage-products" />
    }

    return (
        <div className="create-product-page">
            <h1>Create Product</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Category:
                    <select name="category" onChange={handleProductInputChange}>
                        <option value="">Choose a Category</option>
                        <hr />
                        <option value="Both">Both</option>
                        <option value="Men's">Men's</option>
                        <option value="Women's">Women's</option>
                    </select>
                    <FormError error={errors.category} />
                </label>
                <label>
                    Name:
                    <input 
                        type="text" 
                        name="name" 
                        value={productPayload.name}
                        onChange={handleProductInputChange}
                    />
                    <FormError error={errors.name} />
                </label>
                <label>
                    Product Description:
                    <textarea 
                        type="text" 
                        name="description" 
                        value={productPayload.description}
                        onChange={handleProductInputChange}
                    />
                </label>
                <label>
                    Price:
                    <textarea 
                        type="text" 
                        name="price" 
                        value={productPayload.price}
                        onChange={handleProductInputChange}
                    />
                </label>
                <FormError error={errors.price} />
                <button type="submit" className="button">Create Product</button>
            </form>
            <CreateVariationForm variationsPayload={variationsPayload} setVariationsPayload={setVariationsPayload} />
            <FormError error={errors.variations} />
            <div className="grid-container grid-x grid-margin-x grid-margin-y">
                {renderNewVariations}
            </div>
        </div>
    )
}

export default CreateProductPage