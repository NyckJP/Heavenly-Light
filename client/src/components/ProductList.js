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
        <div className="products" id="products">
            <h1>{category}</h1>
            {productList}
        </div>
    )
}

export default ProductList