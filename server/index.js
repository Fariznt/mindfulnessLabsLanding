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
    const { email, firstName, role, message } = req.body;

    const contactInfo = {
      name: {
        first: firstName
      },
      emails: {
        items: [
          {
            email: email,
            primary: true
          }
        ]
      }
    };

    // Add role and message to extended fields if provided
    if (role || message) {
      contactInfo.extendedFields = {
        items: {}
      };
      if (role) {
        contactInfo.extendedFields.items['custom.role'] = role;
      }
      if (message) {
        contactInfo.extendedFields.items['custom.message'] = message;
      }
    }

    const response = await wixClient.contacts.createContact(contactInfo);

    console.log('Contact created successfully:', response);
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