import React, { useState, useEffect } from "react"
import VariationTile from "./VariationTile"
import EditField from "./EditField"

const EditProductPage = (props) => {
    const [product, setProduct] = useState({id: null, variations: [{color_description: null}]})

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

    let variationList = []
    for(let i = 0; i < product.variations.length; i++) {
        if(i == 0 || product.variations[i].color_description != product.variations[i-1].color_description) {
            let sizes = []
            for(let j = 0; j < product.variations.length; j++) {
                if (product.variations[i].color_description == product.variations[j].color_description)
                    sizes.push(product.variations[j])
            }
            variationList.push(<VariationTile sizes={sizes} />)
        }
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
                    text={product.details}
                    part="details"
                    editProduct={editProduct}
                />
            </div>
            <h1>Edit Variations</h1>
            {variationList}
        </div>
    )
}

export default EditProductPage