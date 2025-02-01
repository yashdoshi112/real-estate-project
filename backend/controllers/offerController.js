// backend/controllers/offerController.js
const pool = require('../config/db');
const pdfService = require('../services/pdfService');
const emailService = require('../services/emailService');

exports.generateOffer = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const { recipientEmail } = req.body;

    // 1. Fetch property details
    const { rows } = await pool.query('SELECT * FROM properties WHERE id = $1', [propertyId]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }
    const property = rows[0];
    console.log("property", property)

    // 2. Financial Calculations (e.g., Cap Rate, IRR)
    const capRate = 1000;
    const irr = 8.5; // Replace with a real calculation if needed

    // 3. Generate PDF Offer
    const pdfBuffer = await pdfService.generateOfferPDF({
      property,
      capRate,
      irr
    });

    // 4. Send Email with the PDF attached
    const emailResult = await emailService.sendOfferEmail({
      to: recipientEmail,
      subject: `Offer for Property ${property.address}`,
      text: `Please find attached the offer for the property at ${property.address}.`,
      attachments: [{
        filename: 'offer.pdf',
        content: pdfBuffer
      }]
    });

    // 5. Log email (for tracking)
    await pool.query(
      'INSERT INTO email_threads(property_id, recipient, subject, status) VALUES($1, $2, $3, $4)',
      [propertyId, recipientEmail, `Offer for Property ${property.address}`, 'SENT']
    );

    res.json({ message: 'Offer generated and email sent successfully', emailResult });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to generate offer' });
  }
};
