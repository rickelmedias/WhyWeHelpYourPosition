import { Search } from "../entitites/Search";

export interface ISearchRepository {
    save(search: Search): Promise<void>;
    searchOnGoogle(keyword: string): Promise<string>;
    itsOnFirstPage(keyword: string, webiste: string): Promise<boolean>;
}