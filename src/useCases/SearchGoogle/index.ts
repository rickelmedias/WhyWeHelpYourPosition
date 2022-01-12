import { MailtrapMailProvide } from "../../providers/implementations/MailtrapMailProvider";
import { PostgresSearchRepository } from "../../repositories/implementations/pg/PostgresSearchRepository";
import { SearchGoogleController } from "./SearchGoogleController";
import { SearchGoogleUseCase } from "./SearchGoogleUseCase";

const mailtrapProvider = new MailtrapMailProvide()
const postgresSearchRepository = new PostgresSearchRepository();

const searchGoogleUseCase = new SearchGoogleUseCase(
    postgresSearchRepository,
    mailtrapProvider
);

const searchGoogleController = new SearchGoogleController(searchGoogleUseCase);

export { searchGoogleUseCase, searchGoogleController }