import { Search } from "../entitites/Search";

export interface ISearchRepository {
    save(search: Search): Promise<void>;
}