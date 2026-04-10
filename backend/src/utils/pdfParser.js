import { readFile } from "node:fs/promises";
import { PDFParse } from "pdf-parse";

const extractTextFromPdf = async (filePath) => {
    try {
        const buffer = await readFile(filePath);
        const parser = new PDFParse({ data: buffer });
        const result = await parser.getText();
        await parser.destroy();
        return result.text || "";
    } catch (error) {
        console.error("Error extracting text from PDF:", error);
        return "";
    }
};

export { extractTextFromPdf };
