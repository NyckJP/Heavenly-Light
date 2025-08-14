import React, { useState, useEffect } from "react"
import InventoryTile from "./InventoryTile"

const ManageProductsPage = () => {
    const [inventoryList, setInventoryList] = useState([])

    const getProducts = async () => {
        try {
            const response = await fetch('/api/v1/admin/all-products')
            const parsedResponse = await response.json()
            setInventoryList(parsedResponse.products)
        } catch (error) {
            console.log(`Error in adminGetProducts fetch: ${error.message}`)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    let key = 0
    const renderedInventoryList = inventoryList.map(product => {
        key++
        return (
            <InventoryTile
                key={key} 
                id={product.id} 
                imageUrl={product.imageUrl} 
                name={product.name} 
                price={product.price} 
                category={product.category}
            />
        )
    })

    return (
        <div className="manage-products-page">
            <h1>Inventory (Product List)</h1>
            {renderedInventoryList}
        </div>
    )
}

export default ManageProductsPage