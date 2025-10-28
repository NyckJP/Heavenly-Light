import React, { useState, useEffect } from "react"
import VariationTile from "./VariationTile"
import EditField from "./EditField"
import { Redirect } from "react-router-dom"

const EditProductPage = (props) => {
    const [product, setProduct] = useState({id: null})
    const [variations, setVariations] = useState([])
    const [shouldRedirect, setShouldRedirect] = useState(false)

    const productId = props.id

    const getProduct = async () => {
        try {
            const response = await fetch(`/api/v1/admin/products/${productId}`)
            const parsedResponse = await response.json()
            setProduct(parsedResponse.product)
            setVariations(parsedResponse.variations.toSorted((a, b) => a.id - b.id))
        } catch (error) {
            console.log(`Error in adminGetProduct fetch: ${error.message}`)
        }
    }

    const editProduct = async (payload, attribute) => {
        const editedProduct = {...product, [attribute]: payload}
        try {
            const response = await fetch(`/api/v1/admin/products/edit/${productId}`, {
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
            console.error(`Error in editProduct fetch: ${error.message}`)
        }
    }

    const deleteProduct = async () => {
        const confirmDelete = confirm("Delete this product?")
        try {
            if (confirmDelete) {
                await fetch(`/api/v1/admin/products/delete/${product.id}`, {
                    method: "delete",
                    headers: new Headers({
                        "Content-Type": "application/json"
                    })
                })
                setShouldRedirect(true)
            }
        } catch (error) {
            console.error(`Error in deleteProduct fetch: ${error.message}`)
        }
    }

    useEffect(() => {
        getProduct()
    }, [])

    let key = 0
    const variationList = variations.map(variation => {
        key++
        return <VariationTile key={key} variation={variation} updateVariation={getProduct} />
    })

    if (shouldRedirect) {
        return <Redirect push to="/admin/products" />
    }

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
            <button className="button" onClick={deleteProduct}>Delete Product</button>
        </div>
    )
}

export default EditProductPage