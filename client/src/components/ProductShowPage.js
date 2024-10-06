import React, { useEffect, useState } from "react";

const ProductShowPage = (props) => {
    const [variationList, setVariationList] = useState([])
    const [variation, setVariation] = useState({})

    const productId = props.match.params.id
    let product

    const getProduct = async () => {
        try {
            const response = await fetch(`/api/v1/products/${productId}`)
            const parsedResponse = await response.json()
            console.log(parsedResponse)
            product = parsedResponse.product
        } catch (error) {
            console.log(`Error in single product fetch: ${error.message}`)
        }
    }

    const getVariations = async () => {
        try {
            const response = await fetch(`/api/v1/variations/${productId}`)
            const parsedResponse = await response.json()
            console.log(parsedResponse)
            setVariationList(parsedResponse.variations)
        } catch (error) {
            console.log(`Error in variations fetch: ${error.message}`)
        }
    }

    useEffect(() => {
        getProduct()
        getVariations()
    }, [])

    return (
        <div></div>
    )
}

export default ProductShowPage