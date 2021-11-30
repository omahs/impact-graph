import HTMLToPDF from 'html-pdf-node';

const Handlebars = require('handlebars');
const path = require('path');
const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

export async function generateHTMLDocument(name: string, data: any) {
  const raw = await readFile(
    path.join(__dirname, '../docs/html/' + name + '.html'),
    'utf-8',
  );

  return Handlebars.compile(raw)(data);
}

export async function generatePDFDocument(
  name: string,
  data: any,
): Promise<String> {
  const html = await generateHTMLDocument(name, data);
  const buf = await HTMLToPDF.generatePdf({ content: html }, { format: 'A4' });

  // fs.writeFileSync("test.pdf", buf)

  return buf.toString('base64');
}
