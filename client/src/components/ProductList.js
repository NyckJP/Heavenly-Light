import React, { useEffect, useState } from "react";
import ProductTile from "./ProductTile.js";

const ProductList = () => {
    const [category, setCategory] = useState("All Products")
    const [products, setProducts] = useState([])

    const setFilter = (allProducts, newCategory) => {
        if(newCategory == "All Products")
            return allProducts
        const newList = allProducts.filter(product => product.category == newCategory)
        return newList
    }

    const getProducts = async () => {
        try {
            const response = await fetch(`/api/v1/products`)
            const parsedResponse = await response.json()
            const filteredList = setFilter(parsedResponse.products, category)
            setProducts(filteredList)
        } catch (error) {
            console.error(`Error in product list fetch: ${error}`)
        }
    }

    useEffect(() => {
        getProducts()
    }, [category])

    let key = 0
    const productList = products.map(product => {
        key++
        return (
            <ProductTile 
                key={key} 
                id={product.id} 
                imageUrl={product.imageUrl} 
                name={product.name} 
                price={product.price} 
            />
        )
    })

    return (
        <div className="grid-container products" id="products">
            <div className="products-header">
                <h1>{category}</h1>
                <div className="category-buttons">
                    <input type="radio" id="All" name="filter" onChange={() => setCategory("All Products")}/>
                    <label htmlFor="All" className="category-button">All</label>

                    <input type="radio" id="Shirts" name="filter" onChange={() => setCategory("Tops")}/>
                    <label htmlFor="Shirts" className="category-button">Tops</label>

                    <input type="radio" id="Mugs" name="filter" onChange={() => setCategory("Mugs")}/>
                    <label htmlFor="Mugs" className="category-button">Mugs</label>

                    <input type="radio" id="Crochet" name="filter" onChange={() => setCategory("Crochets")}/>
                    <label htmlFor="Crochet" className="category-button">Crochets</label>
                </div>
            </div>
            <hr />
            <div className="grid-x grid-margin-x grid-margin-y small-up-2 medium-up-2 large-up-4">
                {productList}
            </div>
        </div>
    )
}

export default ProductList