const express = require('express');
const bodyParser = require('body-parser');
const twilio = require('twilio');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: ['http://127.0.0.1:5500', 'http://localhost:5500']
}));

// Twilio credentials (⚠️ use env variables in production)
const accountSid = 'AC9c43d1dbfc2924e8858c7e2329151284';
const authToken = 'c6ef374349b0ad1ecc2d5656b51d511f';
const twilioPhone = '+17175469250';
const client = twilio(accountSid, authToken);

// Endpoint to send SOS
app.post('/send-sos', async (req, res) => {
    try {
        await client.messages.create({
            body: req.body.message || 'PNJJ J NEED HELP! MY LOCATION IS: https://maps.google.com/?q=28.6139,77.2090',
            from: twilioPhone,
            to: '+918328057598'  // Change this to the recipient number
        });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Start server
app.listen(5000, () => console.log('SOS server running on port 5000'));
