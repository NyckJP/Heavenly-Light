import React, { useEffect, useState } from "react";

const ProductShowPage = (props) => {
    const [product, setProduct] = useState({})
    const [variationList, setVariationList] = useState([{color_description: "none"}])
    const [renderedVariation, setRenderedVariation] = useState(0)

    const productId = props.match.params.id

    const changeSlide = (direction) => {
        if(renderedVariation == 0 && direction == -1 || renderedVariation == variationList.length-1 && direction == 1)
            return
        setRenderedVariation(renderedVariation + direction)
    }

    const collectVariations = (allVariations) => {
        let variations = [
            {
                imageUrl: allVariations[0].imageUrl,
                color_description: allVariations[0].color_description
            }
        ]

        for(let i = 1; i < allVariations.length; i++) {
            if(allVariations[i].color_description != allVariations[i-1].color_description) {
                variations.push({
                    imageUrl: allVariations[i].imageUrl,
                    color_description: allVariations[i].color_description
                })
            }
        }
        
        console.log(variations)
        return variations
    }

    const getProduct = async () => {
        try {
            const response = await fetch(`/api/v1/products/${productId}`)
            const parsedResponse = await response.json()
            console.log(parsedResponse)
            setProduct(parsedResponse.product)
        } catch (error) {
            console.log(`Error in single product fetch: ${error.message}`)
        }
    }

    const getVariations = async () => {
        try {
            const response = await fetch(`/api/v1/variations/${productId}`)
            const parsedResponse = await response.json()
            const variations = collectVariations(parsedResponse.variations)
            setVariationList(variations)
        } catch (error) {
            console.log(`Error in variations fetch: ${error.message}`)
        }
    }

    useEffect(() => {
        getProduct()
        getVariations()
    }, [])

    return (
        <div className="show-page">
            <section className="left-side">
                <i className="fa-solid fa-arrow-left" onClick={() => changeSlide(-1)}/>
                <img src="https://placehold.it/500x600" />
                <i className="fa-solid fa-arrow-right" onClick={() => changeSlide(1)}/>
            </section>
            <section className="right-side">
                <section>
                    <h1>{product.name}</h1>
                    <h4>${product.price}</h4>
                    <p>{variationList[renderedVariation].color_description}</p>
                    <p>Description (Details): Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </section>
                <form>
                    <label>
                        Size:
                        <select>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                    </label>
                    <label>
                        Quantity:
                        <input type="number" min="1" max="5" />
                    </label>
                    <input className="button" defaultValue="Add to Basket"/>
                </form>
            </section>
        </div>
    )
}

export default ProductShowPage