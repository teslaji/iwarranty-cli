// FileService.ts
import { promises as fsPromises } from 'fs';
import { FileServiceInterface } from '../interfaces.js';

export class FileService implements FileServiceInterface {
    async getFileTimestamp(filePath: string): Promise<number> {
        try {
            const stat = await fsPromises.stat(filePath);
            return stat.mtimeMs;
        } catch (error) {
            console.error(`Error getting file timestamp for '${filePath}':`, error);
            throw error;
        }
    }

    async writeFile(filePath: string, data: string): Promise<void> {
        try {
            await fsPromises.writeFile(filePath, data);
            console.log(`Data has been written to ${filePath}`);
        } catch (error) {
            console.error(`Error writing to file '${filePath}':`, error);
            throw error;
        }
    }

    async readFile(filePath: string, encoding: BufferEncoding = 'utf-8'): Promise<string> {
        try {
            const fileData = await fsPromises.readFile(filePath, { encoding });
            return fileData;
        } catch (error) {
            console.error(`Error reading from file '${filePath}':`, error);
            throw error;
        }
    }
}
