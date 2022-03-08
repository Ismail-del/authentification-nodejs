import authJwt from "../middleware/authJwt";
import {
  allAccess,
  moderatorBoard,
  userBoard,
  adminBoard,
} from "../controllers/user-controller";

import { Router } from "express";

const router = Router();

router.get("/api/test/all", allAccess);
router.get(
  "/api/test/user",
  [authJwt.verifyToken, authJwt.isModerator],
  moderatorBoard
);
router.get(
  "/api/test/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  adminBoard
);

export default router;
