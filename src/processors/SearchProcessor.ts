// SearchProcessor.ts

import { SearchService } from '../services/SearchService.js';

export class SearchProcessor {
    private searchService: SearchService;

    constructor(searchService: SearchService) {
        this.searchService = searchService;
    }

    public async search(searchTerm: string): Promise<void> {
        await this.searchService.searchInOutputJson(searchTerm);
    }
}

