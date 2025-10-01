import React, { useState } from "react"
import Dropzone from "react-dropzone"

const EditImageField = (props) => {
    const [newImage, setNewImage] = useState({image: {}, preview: ""})

    const handleImageUpload = acceptedImage => {
        setNewImage({
            ...newImage,
            image: acceptedImage[0],
            preview: URL.createObjectURL(acceptedImage[0])
        })
    }

    const clearImage = () => {
        setNewImage({
            ...newImage,
            image: {},
            preview: ""
        })
    }

    const uploadImage = async () => {
        const imageData = new FormData()
        imageData.append("image", newImage.image)

        try {
            const response = await fetch(`/api/v1/admin/edit-image/${props.variationId}`, {
                method: "PATCH",
                headers: new Headers({
                    "Accept": "image/jpeg"
                }),
                body: imageData
            })
            await props.updateVariation()
            clearImage()
        } catch (error) {
            console.error(`Error in uploadImage fetch: ${error.message}`)
        }
    }

    if (Object.keys(newImage.image).length === 0) {
        return (
            <Dropzone onDrop={handleImageUpload}>
                {({getRootProps, getInputProps}) => (
                    <section className="edit-image-field">
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <img src={props.imageUrl} />
                            <p>Drop File or Click to Upload</p>
                        </div>
                    </section>
                )}
            </Dropzone>
        )
    } else {
        return (
            <section className="edit-image-field">
                <img src={newImage.preview} />
                <div>
                    <button className="button" onClick={uploadImage}>Save Edit</button>
                    <button className="button" onClick={clearImage}>Cancel Edit</button>
                </div>
            </section>
        )
    }
}


export default EditImageField