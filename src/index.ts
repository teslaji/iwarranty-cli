#!/usr/bin/env node


// App.ts

import * as commander from 'commander';
import { FileService } from './services/FileService.js';
import { SearchService } from './services/SearchService.js';
import { ExcelService } from './services/ExcelService.js';
import { ExcelProcessor } from './processors/ExcelProcessor.js';
import { SearchProcessor } from './processors/SearchProcessor.js';
import { FileServiceInterface } from '../src/interfaces.js';

class Cli {
    private excelProcessor: ExcelProcessor;
    private searchProcessor: SearchProcessor;

    constructor(excelProcessor: ExcelProcessor, searchProcessor: SearchProcessor) {
        this.excelProcessor = excelProcessor;
        this.searchProcessor = searchProcessor;
    }

    public async cli(): Promise<void> {
        const program = new commander.Command();
        program.version('1.0.0').description('Convert Excel files to JSON, update output.json, and search if needed');
        
        program
            .command('process <filePaths...>')
            // Add multiple file paths as arguments
            .action(async (filePaths: string[]) => {
                await this.excelProcessor.processExcelFiles(filePaths);
            });

        program
            .command('search <term>')
            .action(async (term: string) => {
                await this.searchProcessor.search(term);
            });

        program.parse(process.argv);

        if (program.args.length === 0) {
            program.outputHelp();
        }
    }
}
// Create instances of the services and processors
const fileService = new FileService() as FileServiceInterface;
const excelService = new ExcelService();
const searchService = new SearchService(fileService);

const excelProcessor = new ExcelProcessor({ fileService, excelService });
const searchProcessor = new SearchProcessor(searchService);

const app = new Cli(excelProcessor, searchProcessor);

app.cli();
