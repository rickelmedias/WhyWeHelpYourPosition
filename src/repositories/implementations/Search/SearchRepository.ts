import { Search } from "../../../entitites/Search";
import { ISearchRepository } from "../../ISearchRepository";
import fetch from 'node-fetch';

// typeorm / database
import { root } from "../../../paths";
import { ConnectionOptions, createConnection } from "typeorm";
import { Researches } from "../../../entitites/Researches";

const options: ConnectionOptions = {
    type: "sqlite",
    database: `${root}/data/db.sqlite`,
    entities: [Researches],
    logging: true
}

export class SearchRepository implements ISearchRepository {
    private searchs: Search[] = [];

    async save(search: Search): Promise<void> {

        try {
            const { name, email, website_url } = search;
            const keyword = `${search.first_keyword} ${search.second_keyword}`.trim();
            const currentDate = new Date();

            const connection = await createConnection(options)
            const researchesRepository = connection.getRepository(Researches)
            const researches = researchesRepository.create({
                name: name,
                email: email,
                keyword: keyword,
                website: website_url,
                created_at: currentDate
            })

            researchesRepository.save(researches);
        } catch (e) {
            console.log("You have an error in your database save, so we saved the object on Array");
            console.log("Your error is: " + e);
            
            this.searchs.push(search);

            console.log("You could try run the: yarn migrations to create a database if this is the error.");
        }
    }

    async searchOnGoogle(keyword: string): Promise<string> {
        const q = keyword.trim().replace(" ", "%20");
        const urlSearch: string = `https://www.google.com/search?q=${q}`;

        const promise = await fetch(urlSearch)
                .then( (result: any) => {
                    return result.text();
                });
                

        return promise;
    }

   async itsOnFirstPage(keyword: string, webiste: string): Promise<boolean> {
        if (webiste === "" || webiste === " " || webiste === "https:///" || webiste === "http://") return false;

        const googleSearchResult = this.searchOnGoogle(keyword);
        const hasYourWebsiteOnFirstGooglePage = (await googleSearchResult).includes(webiste);

        return hasYourWebsiteOnFirstGooglePage;
   }
}