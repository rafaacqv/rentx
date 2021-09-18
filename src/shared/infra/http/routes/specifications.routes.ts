import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const specificatiosRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificatiosRoutes.use(ensureAuthenticated);
specificatiosRoutes.post("/", createSpecificationController.handle);

export { specificatiosRoutes };
