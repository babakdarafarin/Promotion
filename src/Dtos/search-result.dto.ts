export class SearchResultDto{
    public resultsByNames : SearchResult[]
    public resultsByAbouts : SearchResult[]
}

export class SearchResult{
    public id : string
    public firstname : string
    public lastname : string
    public about : string
    public score : string
}