import React, { useState, useEffect } from "react"

const EditStockField = (props) => {
    const [renderEditField, setRenderEditField] = useState(false)
    const [renderedQuantity, setRenderedQuantity] = useState(1)
    const [newQuantity, setNewQuantity] = useState(1)

    const handleInputChange = event => {
        setNewQuantity(event.currentTarget.value)
    }

    const toggleEditField = () => {
        setNewQuantity(renderedQuantity)
        setRenderEditField(!renderEditField)
    }

    const saveEdit = async () => {
        try {
            const response = await fetch(`/api/v1/admin/sizes/edit-stock/${props.id}`, {
                method: "PATCH",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify({ newQuantity: newQuantity })
            })
            if (!response.ok) {
                throw new Error(`${response.status} (${response.statusText})`)
            } else {
                setRenderedQuantity(newQuantity)
                setRenderEditField(false)
            }
        } catch (error) {
            console.error(`Error in editStock fetch: ${error.message}`)
        }
    }

    useEffect(() => {
        setRenderedQuantity(props.quantity)
        setNewQuantity(props.quantity)
    }, [props])

    if(renderEditField){
        return (
            <div className="edit-stock-field">
                <button className="button" onClick={saveEdit}>Save Edit</button>
                <button className="button" onClick={toggleEditField}>Cancel Edit</button>
                <input type="number" min="0" name="quantity" value={newQuantity} onChange={handleInputChange}/>
            </div>
        )
    }else {
        return (
            <div className="edit-stock-field">
                <button className="button" onClick={toggleEditField}>Edit Stock</button>
                <p>{renderedQuantity}</p>
            </div>
        )
    }
}

export default EditStockField