import express from "express";

import getAllUsers from "../controller/user.controller.js"

import protectRoute from "../middlewares/protectRoute.js"

const router = express.Router()

router.use(protectRoute)

router.get("/" , getAllUsers)

export default router