import { Search } from "../../../entitites/Search";
import { ISearchRepository } from "../../ISearchRepository";

export class PostgresSearchRepository implements ISearchRepository {
    private searchs: Search[] = [];

    async save(search: Search): Promise<void> {
        this.searchs.push(search);
    }
}