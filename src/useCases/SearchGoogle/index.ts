import { MailtrapMailProvide } from "../../providers/implementations/MailtrapMailProvider";
import { SearchRepository } from "../../repositories/implementations/pg/SearchRepository";
import { SearchGoogleController } from "./SearchGoogleController";
import { SearchGoogleUseCase } from "./SearchGoogleUseCase";

const mailtrapProvider = new MailtrapMailProvide()
const postgresSearchRepository = new SearchRepository();

const searchGoogleUseCase = new SearchGoogleUseCase(
    postgresSearchRepository,
    mailtrapProvider
);

const searchGoogleController = new SearchGoogleController(searchGoogleUseCase);

export { searchGoogleUseCase, searchGoogleController }