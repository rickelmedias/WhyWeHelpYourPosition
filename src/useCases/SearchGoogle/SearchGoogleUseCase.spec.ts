import { SearchRepository } from "../../repositories/implementations/Search/SearchRepository";

require('dotenv/config');

describe('Testing google search method', () => {
    it ('should return FALSE because the method DID NOT FIND the website', async () => {
        const searchRepository = new SearchRepository();
        const keyword = "Assistir Netflix";
        const website = "";
        const hasYourWebsiteOnFirstGooglePage = await searchRepository.itsOnFirstPage(keyword, website);
        
        expect(hasYourWebsiteOnFirstGooglePage).toEqual(false);
        
    });

    it ('should return TRUE because the method FOUND the website', async () => {
        const searchRepository = new SearchRepository();
        const keyword = "Assistir Netflix";
        const website = "netflix.com";
        const hasYourWebsiteOnFirstGooglePage = await searchRepository.itsOnFirstPage(keyword, website);
        expect(hasYourWebsiteOnFirstGooglePage).toEqual(true);
    });

});