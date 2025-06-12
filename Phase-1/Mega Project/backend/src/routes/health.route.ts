import { Router } from "express";
import { healthCheckController } from "../controller/healthCheck.controller";

const healthRoutes = Router();

healthRoutes.get("/health", healthCheckController);

export default healthRoutes;
