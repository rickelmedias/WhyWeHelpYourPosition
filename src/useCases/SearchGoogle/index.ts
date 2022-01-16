import { MailtrapMailProvide } from "../../providers/implementations/MailtrapMailProvider";
import { SearchRepository } from "../../repositories/implementations/Search/SearchRepository";
import { SearchGoogleController } from "./SearchGoogleController";
import { SearchGoogleUseCase } from "./SearchGoogleUseCase";

const mailtrapProvider = new MailtrapMailProvide()
const searchRepository = new SearchRepository();

const searchGoogleUseCase = new SearchGoogleUseCase(
    searchRepository,
    mailtrapProvider
);

const searchGoogleController = new SearchGoogleController(searchGoogleUseCase);

export { searchGoogleUseCase, searchGoogleController }