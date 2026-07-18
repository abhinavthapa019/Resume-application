const fs = require("fs/promises");
const pdfParse = require("pdf-parse");

async function extractText(filePath) {
    const pdfBuffer = await fs.readFile(filePath);

    const data = await pdfParse(pdfBuffer);

    return data.text;
}

module.exports = {
    extractText,
};