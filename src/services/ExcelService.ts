
// ExcelService.ts
import xlsx from 'xlsx';
import { WorkSheet } from 'xlsx';
import { ExcelData } from '../interfaces.js';

export class ExcelService {


    public loadExcelFile = async (filePath: string): Promise<ExcelData[]> => {
        try {
            const workbook: xlsx.WorkBook = xlsx.readFile(filePath);
            const sheetName: string = workbook.SheetNames[0] || '';
            return xlsx.utils.sheet_to_json(workbook.Sheets[sheetName] as WorkSheet) as ExcelData[];
        } catch (error) {
            console.error('Error loading Excel file:', error);
            throw error;
        }
    }
}
