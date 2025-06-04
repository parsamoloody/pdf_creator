import fs from 'node:fs';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import PDFDocument from 'pdfkit';
import db from './db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pdfDir = path.join(__dirname, 'PDF');
const outputPath = path.join(pdfDir, 'new.pdf');

if (!fs.existsSync(pdfDir)) {
  await mkdir(pdfDir, { recursive: true });
}

const doc = new PDFDocument();
doc.pipe(fs.createWriteStream(outputPath));

doc.fontSize(8).text(`Hi, I am ${db.person.name}`, {
  width: 410,
  align: 'left',
});

doc.moveDown();
doc.text('Skills:');
db.skills.forEach((skill) => {
  doc.text(`- ${skill}`);
});

doc.end();
