import { Search } from "../../entitites/Search";
import { IMailProvider } from "../../providers/IMailProvider";
import { ISearchRepository } from "../../repositories/ISearchRepository";
import { ISearchGoogleDTO } from "./SearchGoogleDTO";

export class SearchGoogleUseCase {
    constructor (
        private searchRepository: ISearchRepository,
        private mailProvider: IMailProvider
    ){}

    async execute(data: ISearchGoogleDTO) {
        const search = new Search(data);
        const keyword = `${search.first_keyword} ${search.second_keyword}`;
        const googleSearchResult = this.searchRepository.searchOnGoogle(keyword);
        const hasYourWebsiteOnFirstGooglePage = (await googleSearchResult).includes(search.website_url);
        
        console.log(hasYourWebsiteOnFirstGooglePage);
        
        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email
            },
            from: {
                name: 'Equipe Search',
                email: 'rickddev@gmail.com'
            },
            subject: 'Entenda seu posicionamento digital',
            body: `
            <img src="">
            <span style="color:#4b05a1;line-height:31px;font-family:Poppins,Helvetica,Arial,sans-serif;font-size:16px;text-align:center;font-weight:bold">POSICIONAMENTO DIGITAL É ESSENCIAL!</span>
            `
        });

        this.searchRepository.save(search);
    }
}