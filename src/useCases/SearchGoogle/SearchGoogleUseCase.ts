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
        const hasYourWebsiteOnFirstGooglePage = await this.searchRepository.itsOnFirstPage(keyword, search.website_url);        
        
        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email
            },
            from: {
                name: 'Equipe Rickelme Developer',
                email: 'equipe@rickelmedias.dev'
            },
            subject: 'A importância de manter seu posicionamento digital',
            body: `
            <table border="0" cellspacing="0" cellpadding="0" align="center" width="600"><tbody>
            <tr>
                <td align="center">
                    <img src="${hasYourWebsiteOnFirstGooglePage == true ? "https://raw.githubusercontent.com/RickelmeDias/WhyWeHelpYourPosition/master/assets/congratulations.png" : "https://raw.githubusercontent.com/RickelmeDias/WhyWeHelpYourPosition/master/assets/close_one.png"}">
                </td>
            </tr>
            <tr>
                <td>
                    <div style="line-height:31px">&nbsp;</div>
                </td>
            </tr>
            <tr>
                <td align="center">
                    <span style="color:#ffc322;line-height:31px;font-family:Roboto,Helvetica,Arial,sans-serif;font-size:16px;text-align:center;font-weight:bold">POSICIONAMENTO DIGITAL É ESSENCIAL!</span>
                </td>
            </tr>
            <tr>
            <td style="text-align: left" align="center">
                <div style="line-height:31px">
                    <span style="color:#625f5f;line-height:31px;font-family:Roboto,Helvetica,Arial,sans-serif;font-size:16px;text-align:justified">
                        Olá, ${data.name}, primeiramente gostariamos de agradecer pelo interesse em conhecer mais sobre nossa forma de trabalho.
                    </span>
                </div>
                <div style="line-height:31px">&nbsp;</div><div style="line-height:31px">
                <span style="color:#625f5f;line-height:31px;font-family:Roboto,Helvetica,Arial,sans-serif;font-size:16px;text-align:justified;font-weight:bold">
                    Sabemos como é desafiador manter o bom posicionamento no mundo digital, principalmente considerando a grande quantidade de negócios que surgem diáriamente. 
                    </br>
                    </br>
                    Pensando nisso o nosso time gostaria de ajudar a impulsionar o seu posicionamento digital e mantê-lo no topo.
                </span>
                </div>
            </td>
            </tr>
            <tr>
                <td style="padding-left:24px;padding-right:24px;text-align:center">
                    <div style="line-height:31px">&nbsp;</div>
                    <div style="line-height:18px">
                        <a href="https://github.com/RickelmeDias/WhyWeHelpYourPosition" rel="noopener" target="_blank">
                            <button style="background-color:#1C3960;color:#ffffff;font-family:Roboto,Helvetica,Arial,sans-serif;font-size:12px;text-align:center;font-weight:bold;padding:16px;border:none;">
                                CONHECER MAIS! 🚀🚀
                            </button>
                        </a>
                    </div>
                </td>
            </tr>    
            </tbody></table>
            `
        });

        this.searchRepository.save(search);
    }
}