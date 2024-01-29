// Interfaces.ts

import { ExcelService } from "./services/ExcelService.js";

export interface ExcelData {
    [key: string]: string;
}

export interface FileTimestamps {
    [filePath: string]: number;
}

export interface ExcelProcessorOptions {
    fileService: FileServiceInterface;
    excelService: ExcelService;
}
export interface FileServiceInterface {
    getFileTimestamp(filePath: string): Promise<number>;
    writeFile(filePath: string, data: string): Promise<void>;
    readFile(filePath: string, encoding: BufferEncoding): Promise<string>;
}