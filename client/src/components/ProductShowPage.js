import React, { useEffect, useState } from "react"

const ProductShowPage = (props) => {
    const [product, setProduct] = useState({ id: null })
    const [variationList, setVariationList] = useState([{color_description: "none"}])
    const [renderedVariation, setRenderedVariation] = useState(0)
    const [basketItem, setBasketItem] = useState({ color_description: "none", size: "S", quantity: "1" })
    const [basketButton, setBasketButton] = useState("Add to Basket")

    const productId = props.match.params.id

    const changeSlide = (direction) => {
        if(renderedVariation == 0 && direction == -1 || renderedVariation == variationList.length-1 && direction == 1)
            return
        setRenderedVariation(renderedVariation + direction)
        setBasketItem({...basketItem, color_description: variationList[renderedVariation + direction].color_description})
        setBasketButton("Add to Basket")
    }

    const handleInputChange = event => {
        setBasketItem({...basketItem, [event.currentTarget.name]: event.currentTarget.value})
        setBasketButton("Add to Basket")
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
        
        return variations
    }

    const saveToBasket = async (event) => {
        event.preventDefault()
        try {
            const response = await fetch('/api/v1/baskets', {
                method: "post",
                headers: new Headers({ 'Content-type': 'application/json' }),
                body: JSON.stringify({ productId: product.id, basketItem: basketItem })
            })
            if(response.ok){
                setBasketButton("Item Saved in Basket!")
                props.getBasketCount()
            } else {
                if(response.status == 400)
                    alert('Maximum Quantity Reached')
                setBasketButton("Save Failed")
            }
        } catch (error) {
            console.log(`Error in saveToBasket fetch: ${error.message}`)
        }
    }

    const getProduct = async () => {
        try {
            const response = await fetch(`/api/v1/products/${productId}`)
            const parsedResponse = await response.json()
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
            setBasketItem({...basketItem, color_description: variations[0].color_description})
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
                    <p>Description (Details): {product.details}</p>
                    <p>Placeholder Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </section>
                <form onSubmit={saveToBasket}>
                    <label>
                        Size:
                        <select name="size" onChange={handleInputChange}>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                    </label>
                    <label>
                        Quantity:
                        <input type="number" min="1" max="5" name="quantity" value={basketItem.quantity} onChange={handleInputChange}/>
                    </label>
                    <input className="button" type="submit" value={basketButton}/>
                </form>
            </section>
        </div>
    )
}

export default ProductShowPage