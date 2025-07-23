import { Router } from "express";

const router = Router();

router.use("/user", UserRouter);
router.use("/website", websiteRouter);

export default router;