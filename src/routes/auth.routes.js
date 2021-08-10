import { Router } from "express";
const router = Router();

import * as authCtrl from "../controllers/auth.controller";
import { verifySignup } from "../middlewares";

router.use((req, res, next) => {
    console.log(req);
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});

router.post(
    "/signup", [verifySignup.checkDuplicateUsernameOrEmail, verifySignup.checkRolesExisted],
    authCtrl.signUp
);



router.post("/signin", authCtrl.signin);

router.get("/users", authCtrl.getUsers);
router.get("/users/:userId", authCtrl.getUserByID);
router.put("/users/:userId", authCtrl.editUser);


export default router;