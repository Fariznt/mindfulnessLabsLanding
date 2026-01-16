import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@wix/api-client';
import { contacts } from '@wix/crm';
// import { labels } from '@wix/crm'; // Commented out for testing

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

// Helper function to find or create a label - COMMENTED OUT FOR TESTING
/*
async function findOrCreateLabel(labelName) {
  try {
    // Try to find existing label
    const { labels: existingLabels } = await wixClient.labels.queryLabels().find();
    const existingLabel = existingLabels.find(label => label.displayName === labelName);
    
    if (existingLabel) {
      return existingLabel.key;
    }
    
    // Create new label if it doesn't exist
    const newLabel = await wixClient.labels.createLabel({
      displayName: labelName,
      labelType: 'USER_DEFINED'
    });
    
    return newLabel.key;
  } catch (error) {
    console.error(`Error finding/creating label "${labelName}":`, error);
    return null;
  }
}
*/

app.post('/api/subscribe', async (req, res) => {
  try {
    const { email, firstName, lastName, role, message } = req.body;

    // COMMENTED OUT LABEL CODE FOR TESTING
    /*
    // Prepare label keys
    const labelKeys = [];
    
    // Find or create "Interest from Landing Page" label
    const landingPageLabelKey = await findOrCreateLabel('Interest from Landing Page');
    if (landingPageLabelKey) {
      labelKeys.push(landingPageLabelKey);
    }
    
    // Find or create role-based label
    if (role) {
      const roleLabelKey = await findOrCreateLabel(role);
      if (roleLabelKey) {
        labelKeys.push(roleLabelKey);
      }
    }
    */

    const contactInfo = {
      name: {
        first: firstName,
        last: lastName
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

    // COMMENTED OUT - Add labels if any were successfully created/found
    /*
    if (labelKeys.length > 0) {
      contactInfo.labelKeys = {
        items: labelKeys
      };
    }
    */

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