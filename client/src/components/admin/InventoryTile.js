import React from "react"

const InventoryTile = ({id, image, name, category, price}) => {
    return (
        <div className="inventory-tile">
            <img src="https://placehold.co/500x600" />
            <h2>{name}</h2>
            <h3>{category}</h3>
            <h3>${price}</h3>
            <a href={`/edit-product/${id}`} className="button">Edit...</a>
        </div>
    )
}

export default InventoryTile