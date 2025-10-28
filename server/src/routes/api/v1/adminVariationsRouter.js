import express from "express"
import { Variation } from "../../../models/index.js"
import uploadImage from "../../../services/uploadImage.js"

const adminVariationsRouter = new express.Router()

adminVariationsRouter.patch("/edit/:id", async (req, res) => {
    const { editedColor } = req.body
    const { id } = req.params

    try {
        const editedVariation = await Variation.query().patchAndFetchById( id, { color: editedColor })
        return res.status(200).json({ editedVariation: editedVariation})
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
})

adminVariationsRouter.patch("/edit-image/:id", uploadImage.single("image"), async (req, res) => {
    const { id } = req.params

    try {
        const newImage = await Variation.query().patchAndFetchById(id, { imageUrl: req.file.location})
        return res.status(200).json({ editedImage: newImage })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ errors: error })
    }
})

export default adminVariationsRouter