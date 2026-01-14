import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@wix/api-client';
import { contacts } from '@wix/crm';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const wixClient = createClient({
  modules: { contacts },
  auth: {
    getAuthHeaders: async () => ({
      headers: {
        Authorization: process.env.WIX_API_KEY,
        "wix-site-id": process.env.WIX_SITE_ID
      }
    })
  }
});

app.post('/api/subscribe', async (req, res) => {
  try {
    const { email, firstName, lastName } = req.body;

    const response = await wixClient.use(contacts).createContact({
      contact: {
        info: {
          name: {
            first: firstName,
            last: lastName
          },
          emails: [{
            email: email,
            primary: true
          }]
        }
      }
    });

    res.json({ success: true, data: response });
  } catch (error) {
    console.error('Error creating contact:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
});