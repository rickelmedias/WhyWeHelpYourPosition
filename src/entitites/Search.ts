export class Search {
    public readonly name: string;
    public readonly email: string;
    public first_keyword: string;
    public second_keyword: string;
    public website_url: string;

    constructor(props: Search) {
        Object.assign(this, props);
    }
}