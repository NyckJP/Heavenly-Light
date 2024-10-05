import React, { useEffect, useState } from "react";

const ProductShowPage = (props) => {
    const [variationList, setVariationList] = useState([])
    const [variation, setVariation] = useState("")

    const productId = props.match.params.id

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
        getVariations()
    }, [])

    return (
        <div></div>
    )
}

export default ProductShowPage