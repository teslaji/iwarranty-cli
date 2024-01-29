
// ExcelProcessor.ts

import path from 'path';
import { ExcelProcessorOptions, ExcelData } from '../../src/interfaces.js';
import { fileURLToPath } from 'url';



export class ExcelProcessor {
    private options: ExcelProcessorOptions;
    private currentModulePath: string;
    constructor(options: ExcelProcessorOptions) {
        this.options = options;
        // Use fileURLToPath to convert import.meta.url to file path
        this.currentModulePath = fileURLToPath(import.meta.url);
    }

    public async processExcelFiles(filePaths: string[]): Promise<void> {
        const { fileService, excelService } = this.options;

        const fileTimestamps: { [filePath: string]: number } = {};
        let allExcelData: ExcelData[] = [];
        let outputFilePath: string;

        for (const filePath of filePaths) {
            try {
                const lastTimestamp = fileTimestamps[filePath] || 0;
                const currentTimestamp = await fileService.getFileTimestamp(filePath);
                // Compare the current timestamp with the last timestamp
                if (currentTimestamp > lastTimestamp) {
                    const excelDataArray = await excelService.loadExcelFile(filePath);
                    allExcelData = allExcelData.concat(excelDataArray.flat());
                    fileTimestamps[filePath] = currentTimestamp;
                    console.log('All Excel Data:', allExcelData);

                } else {
                    console.log('No updates needed for file:', filePath);
                }
            } catch (error) {
                console.error('Error processing Excel file:', error);
            }
        }

        // Now set outputFilePath outside the loop
        outputFilePath = path.join(
            path.dirname(this.currentModulePath),
            '..',
            'output.json'
        );

        const uniqueData = this.filterUniqueData(allExcelData);
        await fileService.writeFile(outputFilePath, JSON.stringify(uniqueData, null, 2));
        console.log(`Unique data has been written to ${outputFilePath}`);
        console.log('Unique Data:', uniqueData);

    }
    // Add the filterUniqueData method
    private filterUniqueData(data: ExcelData[]): ExcelData[] {
        const uniqueMap: { [key: string]: ExcelData } = {};

        for (const entry of data) {
            // Generate a unique key based on the entire entry
            const identifierValue = JSON.stringify(entry);

            uniqueMap[identifierValue] = entry;
        }

        // Convert the values of the map back to an array
        const uniqueArray = Object.values(uniqueMap);

        return uniqueArray;
    }


}