import fs from 'node:fs';
import { mkdir } from 'node:fs/promises';
import PDFDocument from 'pdfkit';
import db from './db.js';

const doc = new PDFDocument();
const pdfPath = new URL('./PDF', import.meta.url).pathname;

if (!fs.existsSync(pdfPath) || !fs.lstatSync(pdfPath).isDirectory()) {
  await mkdir(pdfPath, { recursive: true });
}

doc.pipe(fs.createWriteStream(`${pdfPath}/new.pdf`));

doc.fontSize(8).text(`Hi, I am ${db.person.name}`, {
  width: 410,
  align: 'left',
});

doc.moveDown();
doc.text('Skills:');
db.skills.forEach((skill, i) => {
  doc.text(`- ${skill}`);
});

doc.end();
