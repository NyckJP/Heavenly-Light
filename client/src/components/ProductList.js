import React, { useEffect, useState } from "react";
import ProductTile from "./ProductTile.js";

const ProductList = () => {
    const [category, setCategory] = useState("All Products")
    const [products, setProducts] = useState([])

    const getProducts = async () => {
        try {
            const response = await fetch(`/api/v1/products`)
            const parsedResponse = await response.json()
            console.log(parsedResponse.products)
            setProducts(parsedResponse.products)
        } catch (error) {
            console.error(`Error in product list fetch: ${error}`)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    const productList = products.map(product => {
        return <ProductTile imageUrl={product.imageUrl} name={product.name} price={product.price} />
    })

    return (
        <div className="grid-container products" id="products">
            <h1>{category}</h1>
            <hr />
            <div className="grid-x grid-margin-x small-up-2 medium-up-2 large-up-4">
                {productList}
            </div>
        </div>
    )
}

export default ProductList