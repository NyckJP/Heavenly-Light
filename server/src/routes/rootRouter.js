import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import productsRouter from "./api/v1/productsRouter.js";
import variationsRouter from "./api/v1/variationsRouter.js";
import basketsRouter from "./api/v1/basketsRouter.js";
import stripeRouter from "./api/v1/stripeRouter.js";

const rootRouter = new express.Router();

rootRouter.use("/", clientRouter);
rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/products", productsRouter);
rootRouter.use("/api/v1/variations", variationsRouter);
rootRouter.use("/api/v1/baskets", basketsRouter);
rootRouter.use("/api/v1/stripe", stripeRouter);

export default rootRouter;
