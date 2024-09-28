import {Router} from "express";

import * as authControllers from "../controllers/auth.js";

import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../utils/validateBody.js";

import {userSignupSchema, userSigninSchema} from "../validation/users.js";

const authRouter = Router();

authRouter.post("/register", validateBody(userSignupSchema), ctrlWrapper(authControllers.registerController));


authRouter.get("/verify", ctrlWrapper(authControllers.verifyController));

authRouter.post("/login", validateBody(userSigninSchema), ctrlWrapper(authControllers.signinController));

authRouter.post("/refresh", ctrlWrapper(authControllers.refreshController));

authRouter.post("/signout", ctrlWrapper(authControllers.signoutController));


authRouter.post("/login", validateBody(userSigninSchema), ctrlWrapper(authControllers.loginController));

authRouter.post("/refresh", ctrlWrapper(authControllers.refreshController));

authRouter.post("/logout", ctrlWrapper(authControllers.logoutController));


export default authRouter;