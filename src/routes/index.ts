import express from "express";
import { UserRouter } from "./user/user-router";
import { AuthRouter } from "./auth/auth-router";

export const router = express.Router();

router.use("/user", UserRouter);
router.use("/auth", AuthRouter);
// // middleWare for authentication
// router.use('/owner', authMiddleware)
// // check that owner is an owner and not a simple user
// router.use('/owner', typeChecker.ownerMiddleware)
// // route owner
// router.use('/owner', owner)
