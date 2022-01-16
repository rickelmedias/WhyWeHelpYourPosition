import { Request,Response } from "express";
import { SearchGoogleUseCase } from "./SearchGoogleUseCase";

export class SearchGoogleController {
    constructor(
        private searchGoogleUseCase: SearchGoogleUseCase,
    ){ }

    async handle( req: Request, res: Response) {
        const { name, email, first_keyword, second_keyword, website_url } = req.body;
        
        if (name.trim() === "" || name === undefined || name === null  || typeof name != 'string')  {
            return res.status(400).json({
                name: {
                    error: 'You must define the name.',
                    field_type: '<string>'
                }
            });
        }

        if (email.trim() === "" || email === undefined || email === null || typeof email != 'string')  {
            return res.status(400).json({
                email: {
                    error: 'You must define the email.',
                    field_type: '<string>'
                }
            });
        }

        if (first_keyword.trim() === "" || first_keyword === undefined || first_keyword === null || typeof first_keyword != 'string')  {
            return res.status(400).json({
                first_keyword: {
                    error: 'You must define the first keyword.',
                    field_type: '<string>'
                }
            });
        }

        if (second_keyword === undefined || second_keyword === null || typeof second_keyword != 'string')  {
            return res.status(400).json({
                second_keyword: {
                    error: 'Unexpected data type.',
                    field_type: '<string>'
                }
            });
        }

        if (website_url.trim() === "" || website_url === undefined || website_url === null || typeof website_url != 'string')  {
            return res.status(400).json({
                website_url: {
                    error: 'You must define the website.',
                    field_type: '<string>'
                }
            });
        }

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