// SearchService.ts

import path from 'path';
import { FileServiceInterface } from '../interfaces.js';

export class SearchService {
    private fileService: FileServiceInterface;
    private moduleDir: string;

    constructor(fileService: FileServiceInterface) {
        this.fileService = fileService;
        this.moduleDir = path.dirname(new URL(import.meta.url).pathname);
    }

    public async searchInOutputJson(searchTerm: string): Promise<void> {
        const outputFilePath = path.join(this.moduleDir, '..', 'output.json');

        try {
            const outputData: any[] = JSON.parse(await this.fileService.readFile(outputFilePath, 'utf-8'));
            // Search for the search term in all the values of the output.json file
            const matchingResults: any[] = outputData
                .flat()
                .filter((entry) => {
                    for (const key in entry) {
                        if (entry.hasOwnProperty(key) && entry[key].toString().includes(searchTerm)) {
                            return true;
                        }
                    }
                    return false;
                });

            matchingResults.forEach((result) => {
                console.log(JSON.stringify(result));
            });
        } catch (error) {
            console.error('Error searching in output.json:', error);
        }
    }
}