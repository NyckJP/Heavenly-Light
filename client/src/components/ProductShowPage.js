import React, { useEffect, useState } from "react"
import VariationImage from "./VariationImage.js"

const ProductShowPage = (props) => {
    const [product, setProduct] = useState({ id: null })
    const [variationList, setVariationList] = useState([])
    const [renderedVariation, setRenderedVariation] = useState(0)
    const [sizeList, setSizeList] = useState([])
    const [maxQuantity, setMaxQuantity] = useState(5)
    const [basketItem, setBasketItem] = useState({ color: "none", size: null, quantity: "1" })
    const [basketButton, setBasketButton] = useState("Add to Basket")

    const productId = props.match.params.id

    const changeSlide = (direction) => {
        if(renderedVariation == 0 && direction == -1 || renderedVariation == variationList.length-1 && direction == 1)
            return
        setRenderedVariation(renderedVariation + direction)
        setBasketItem({...basketItem, color: variationList[renderedVariation + direction].color})
        setBasketButton("Add to Basket")
    }

    const handleInputChange = event => {
        if(event.currentTarget.name == "size"){
            sizeList.forEach(size => {
                if(size.size == event.currentTarget.value){
                    setMaxQuantity(size.quantity)
                }
            })
        }
        setBasketItem({...basketItem, [event.currentTarget.name]: event.currentTarget.value})
        setBasketButton("Add to Basket")
    }

    const collectVariations = (allVariations) => {
        let variations = [
            {
                id: allVariations[0].id,
                imageUrl: allVariations[0].imageUrl,
                color: allVariations[0].color
            }
        ]

        for(let i = 1; i < allVariations.length; i++) {
            if(allVariations[i].color != allVariations[i-1].color) {
                variations.push({
                    id: allVariations[i].id,
                    imageUrl: allVariations[i].imageUrl,
                    color: allVariations[i].color
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
            setBasketItem({...basketItem, color: variations[0].color})
        } catch (error) {
            console.log(`Error in variations fetch: ${error.message}`)
        }
    }
    
    const getSizes = async () => {
        try {
            const response = await fetch(`/api/v1/variations/sizes/${variationList[renderedVariation].id}`)
            const parsedResponse = await response.json()
            setSizeList(parsedResponse.sizes)
            setBasketItem({...basketItem, size: parsedResponse.sizes[0].size, color: variationList[renderedVariation].color})
        } catch (error) {
            console.log(`Error in sizes fetch: ${error.message}`)
        }
    }
    
    useEffect(() => {
        getProduct()
        getVariations()
    }, [])

    useEffect(() => {
        getSizes()
    }, [variationList, renderedVariation])

    useEffect(() => {
        sizeList.forEach(size => {
            if(size.size == basketItem.size){
                setMaxQuantity(size.quantity)
            }
        })
    }, [sizeList])
    
    let key = 0
    let sizeOptions = sizeList.map(size => {
        key++
        return <option key={key} value={size.size}>{size.size}</option>
    })

    return (
        <div className="show-page">
            <VariationImage changeSlide={changeSlide} variationList={variationList} renderedVariation={renderedVariation} />
            <section className="right-side">
                <section>
                    <h1>{product.name}</h1>
                    <h4>${product.price}</h4>
                    <p>{variationList.length > 0 ? variationList[renderedVariation].color : null}</p>
                    <p>Description: {product.description}</p>
                    <p>Placeholder Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </section>
                <form onSubmit={saveToBasket}>
                    <label>
                        Size:
                        <select name="size" onChange={handleInputChange}>
                            {sizeOptions}
                        </select>
                    </label>
                    <label>
                        Quantity:
                        <input type="number" min="1" max={maxQuantity} name="quantity" value={basketItem.quantity} onChange={handleInputChange}/>
                    </label>
                    <input className="button" type="submit" value={basketButton}/>
                </form>
            </section>
        </div>
    )
}

export default ProductShowPage