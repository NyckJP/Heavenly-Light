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
        props.editProduct(editPayload, props.part)
        setRenderEditField(!renderEditField)
    }

    let dollarSign
    if(props.part == "price"){
        dollarSign = "$"
    }

    let textField = <input type="text" onChange={handleInputChange} value={editPayload} /> 
    let displayText = <h2>{dollarSign}{props.text}</h2>
    if(props.part == "description"){
        textField = <textarea type="text" onChange={handleInputChange} value={editPayload} />
        displayText = <h3>{props.text}</h3>
    }

    if (renderEditField) {
        return (
            <div className="edit-field">
                {textField}
                <div>
                    <button className="button" onClick={saveEdit}>Save Edit</button>
                    <button className="button" onClick={toggleEditField}>Cancel Edit</button>
                </div>
            </div>
        )
    } else {
        return (
            <div className="edit-field">
                {displayText}
                <button className="button" onClick={toggleEditField}>Edit {props.part}...</button>
            </div>
        )
    }
}

export default EditField