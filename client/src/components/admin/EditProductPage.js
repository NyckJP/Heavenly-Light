import React, { useState, useEffect } from "react"
import VariationTile from "./VariationTile"
import EditField from "./EditField"

const EditProductPage = (props) => {
    const [product, setProduct] = useState({id: null, variations: [{id: 1, color: null}]})

    const productId = props.match.params.id

    const getProduct = async () => {
        try {
            const response = await fetch(`/api/v1/admin/get-product/${productId}`)
            const parsedResponse = await response.json()
            setProduct(parsedResponse.product)
        } catch (error) {
            console.log(`Error in adminGetProduct fetch: ${error.message}`)
        }
    }

    const editProduct = async (attribute, payload) => {
        const editedProduct = {...product, [attribute]: payload}
        try {
            const response = await fetch(`/api/v1/admin/edit-product/${productId}`, {
                method: "PATCH",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(editedProduct)
            })
            if (!response.ok) {
                throw new Error(`${response.status} (${response.statusText})`)
            } else {
                setProduct(editedProduct)
            }
        } catch (error) {
            console.error(`Error in patch fetch: ${error.message}`)
        }
    }

    useEffect(() => {
        getProduct()
    }, [])

    let key = 0
    const variationList = product.variations.map(variation => {
        key++
        return <VariationTile key={key} variation={variation} />
    })

    return (
        <div className="manage-products-page">
            <h1>Edit Product</h1>
            <div className="product-section">
                <div>
                    <EditField 
                        text={product.name}
                        part="name"
                        editProduct={editProduct}
                    />
                </div>
                <section>
                    <EditField 
                        text={product.category}
                        part="category"
                        editProduct={editProduct}
                    />
                    <EditField 
                        text={product.price}
                        part="price"
                        editProduct={editProduct}
                    />
                </section>
                <EditField 
                    text={product.description}
                    part="description"
                    editProduct={editProduct}
                />
            </div>
            <h1>Edit Variations</h1>
            {variationList}
        </div>
    )
}

export default EditProductPage