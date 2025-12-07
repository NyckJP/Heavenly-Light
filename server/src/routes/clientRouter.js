import express from "express"
import getClientIndexPath from "../config/getClientIndexPath.js"

const router = new express.Router()

const clientRoutes = [
  "/", 
  "/user-sessions/new", 
  "/users/new", 
  "/products/:id", 
  "/about",
  "/basket", 
  "/checkout", 
  "/return", 
  "/admin/products", 
  "/admin/products/edit/:id",
  "/admin/products/new"
]

router.get(clientRoutes, (req, res) => {
  res.sendFile(getClientIndexPath())
})

export default router
