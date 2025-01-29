import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const currentDirectory = dirname(fileURLToPath(import.meta.url));
console.log(currentDirectory);
const filePath=path.join(currentDirectory,'error.txt');
console.log(filePath);
export const writeErrorToLog=async (message)=>{
    try {
        const dataToWrite = typeof message === 'object' ? JSON.stringify(message, null, 2) : message;
        await fs.appendFile(filePath, dataToWrite + '\n');
    } catch (error) {
        console.log(error)
    }
}