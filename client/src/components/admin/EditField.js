import React, { useState } from "react"

const EditField = (props) => {
    const [renderEditField, setRenderEditField] = useState(false)
    const [editPayload, setEditPayload] = useState("")
    
    const toggleEditField = () => {
        setRenderEditField(!renderEditField)
        setEditPayload(props.text)
    }
    
    const handleInputChange = event => {
        setEditPayload(event.currentTarget.value)
    }
    
    const saveEdit = () => {
        props.editProduct(props.part, editPayload)
        setRenderEditField(!renderEditField)
    }

    if (renderEditField) {
        return (
            <div className="edit-field">
                <input type="text" onChange={handleInputChange} value={editPayload} /> 
                <div>
                    <button className="button" onClick={saveEdit}>Save Edit</button>
                    <button className="button" onClick={toggleEditField}>Cancel Edit</button>
                </div>
            </div>
        )
    } else {
        return (
            <div className="edit-field">
                <h2>{props.text}</h2>
                <button className="button" onClick={toggleEditField}>Edit {props.part}...</button>
            </div>
        )
    }
}

export default EditField