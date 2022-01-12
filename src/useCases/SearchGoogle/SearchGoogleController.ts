import { Request,Response } from "express";
import { SearchGoogleUseCase } from "./SearchGoogleUseCase";

export class SearchGoogleController {
    constructor(
        private searchGoogleUseCase: SearchGoogleUseCase,
    ){ }

    async handle( req: Request, res: Response) {
        const { name, email, first_keyword, second_keyword, website_url } = req.body;
        
        try {
            await this.searchGoogleUseCase.execute({
                name, email, first_keyword, second_keyword, website_url });
            return res.status(200).send();
        }
        catch (e) {
            return res.status(400).json({
                message: e.message || 'Unexpected error.'
            })
        }
    }
}