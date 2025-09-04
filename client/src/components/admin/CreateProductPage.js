import React, { useState } from "react"
import { Redirect } from "react-router-dom"
import CreateVariationForm from "./CreateVariationForm.js"
import NewVariationTile from "./NewVariationTile.js"

const CreateProductPage = () => {
    const [productPayload, setProductPayload] = useState({ name: "", category: "", description: "", price: ""})
    const [variationsPayload, setVariationsPayload] = useState([])
    const [shouldRedirect, setShouldRedirect] = useState(false)

    const handleProductInputChange = event => {
        setProductPayload({
            ...productPayload, 
            [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch("/api/v1/admin", {
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify({ product: productPayload, variations: variationsPayload })
            })
            setShouldRedirect(true)
        } catch (error) {
            console.error(`Error in product handleSubmit fetch: ${error.message}`)
        }
    }

    let key = 0
    const renderNewVariations = variationsPayload.map(variation => {
        key++
        return <NewVariationTile key={key} color={variation.color} startingQuantity={variation.startingQuantity} />
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
                </label>
                <label>
                    Name:
                    <input 
                        type="text" 
                        name="name" 
                        value={productPayload.name}
                        onChange={handleProductInputChange}
                    />
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
                <button type="submit" className="button">Create Product</button>
            </form>
            <CreateVariationForm variationsPayload={variationsPayload} setVariationsPayload={setVariationsPayload} />
            <div className="grid-container grid-x grid-margin-x grid-margin-y">
                {renderNewVariations}
            </div>
        </div>
    )
}

export default CreateProductPage