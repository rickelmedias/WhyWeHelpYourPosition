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
        const search = new Search(data)
        this.searchRepository.save(search)
        

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
            body: '<p> Ola </p>'
        })
    }
}