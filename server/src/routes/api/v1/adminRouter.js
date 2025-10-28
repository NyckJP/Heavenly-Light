import express from "express"
import adminProductsRouter from "./adminProductsRouter.js"
import adminVariationsRouter from "./adminVariationsRouter.js"
import adminSizesRouter from "./adminSizesRouter.js"

const adminRouter = new express.Router()

adminRouter.use("/products", adminProductsRouter)
adminRouter.use("/variations", adminVariationsRouter)
adminRouter.use("/sizes", adminSizesRouter)

export default adminRouter