// backend/services/pdfService.js
const PDFDocument = require('pdfkit');

exports.generateOfferPDF = (data) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const buffers = [];
      
      // Collect the PDF data as buffers
      doc.on('data', buffers.push.bind(buffers));
      doc.on('end', () => {
        const pdfData = Buffer.concat(buffers);
        resolve(pdfData);
      });
      
      // Build the PDF content
      doc.fontSize(20).text('Property Offer', { align: 'center' });
      doc.moveDown();
      
      doc.fontSize(12).text(`Address: ${data.property.address}`);
      doc.text(`Price: $${data.property.price}`);
      doc.text(`Type: ${data.property.type}`);
      doc.moveDown();
      
      doc.text(`Cap Rate: ${data.capRate.toFixed(2)}%`);
      doc.text(`IRR: ${data.irr}%`);
      doc.moveDown();
      
      doc.text('Thank you for considering this offer.', { align: 'center' });
      
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
};
