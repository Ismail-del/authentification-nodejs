import verifySignUp from "../middleware/verifySignUp";
import { signin, singup } from "../controllers/auth-controller";
import { Router } from "express";

const router = Router();

router.post(
  "/api/auth/singup",
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  singup
);

router.post("/api/auth/signin", signin);
router.get("/api/test", (req, res) => {
  res.status(200).send({ message: "works" });
});

export default router;
