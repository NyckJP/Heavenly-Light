import express from "express"
import passport from "passport"
import { v4 as uuidv4 } from "uuid"

const sessionRouter = new express.Router()

sessionRouter.post("/", (req, res, next) => {
  return passport.authenticate("local", (err, user) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err)
    }

    if (user) {
      return req.login(user, () => {
        return res.status(201).json(user)
      })
    }

    return res.status(401).json(undefined)
  })(req, res, next)
})

sessionRouter.post("/new-guest", (req, res) => {
  req.session.guestId = uuidv4()
  console.log(req.session)
  res.status(201).json({ guestId: req.session.guestId })
})

sessionRouter.get("/current", async (req, res) => {
  if (req.user) {
    res.status(200).json(req.user)
  } else {
    if(!req.session.guestId){
      req.session.guestId = uuidv4()
    }
    console.log(req.session)
    res.status(401).json(undefined)
  }
})

sessionRouter.delete("/", (req, res) => {
  req.logout()
  res.status(200).json({ message: "User signed out" })
})

export default sessionRouter
