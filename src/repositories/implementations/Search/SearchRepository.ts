import { Search } from "../../../entitites/Search";
import { ISearchRepository } from "../../ISearchRepository";
import fetch from 'node-fetch';

export class SearchRepository implements ISearchRepository {
    private searchs: Search[] = [];

    async save(search: Search): Promise<void> {
        this.searchs.push(search);
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