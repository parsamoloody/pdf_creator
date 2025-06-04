import fs from 'node:fs'
import PDFDocument from 'pdfkit'
import db from './db.js';

const doc = new PDFDocument();
doc.pipe(fs.createWriteStream('./PDF/new.pdf'))

doc.fontSize(8);
doc.text(`Hi, i am ${db.person.name}`, {
    width: 410,
    align: 'left'
}
);
doc.table({
    data: [
        (function () {
            for (let i = 0; i <= db.skills.length; i++) {
                console.log(db.skills[i])
            }
        })
    ]
})


