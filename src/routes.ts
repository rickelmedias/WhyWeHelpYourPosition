import { Router } from "express";
import { searchGoogleController } from "./useCases/SearchGoogle";

const router = Router();

router.post('/findme', (req, res) => {    
    return searchGoogleController.handle(req, res);
})

export { router }