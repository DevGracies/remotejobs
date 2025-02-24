# 🚀 Tech Job Alerts Integration

This is a **Telex Integration** that fetches remote tech job listings from the **RemoteOK API** and posts them in a **Telex channel** at set intervals.

---

## 📌 Features
- ✅ **Fetches tech jobs** from RemoteOK.io
- ✅ **Filters jobs** based on specified keywords (React, MERN, Frontend, Backend, etc.)
- ✅ **Sends job alerts** to a Telex channel at intervals (default: every 3 hours)
- ✅ **Easy to configure** and deploy

---

## 🛠️ Installation & Setup

### **1. Clone the repository**
```bash
git clone https://github.com/DevGracies/remotejobs
cd remotejobs
```

### **2. Install dependencies**
```bash
npm install
```

### **3. Create a `.env` file**
```plaintext
TELEX_API_URL=https://telex.example.com/api/send-message
REMOTEOK_API_URL=https://remoteok.io/api
CHANNEL_ID=your-telex-channel-id
```

### **4. Configure Job Filters** (Optional)
Modify `config/default.json` to update **keywords** and **intervals**:
```json
{
  "jobFilters": {
    "keywords": ["React", "MERN", "Frontend", "Backend", "Fullstack"],
    "interval": "3 hours"
  }
}
```

---

## ▶️ Running the Integration

Start the integration locally:
```bash
node index.js
```
You should see:
```bash
Tech Job Alerts Integration running on port 3000
Fetching job listings...
Found X new jobs
```

---

## 🧪 Testing

### **1. Fetch jobs manually**
```bash
node
```
Then run:
```javascript
const { fetchJobListings } = require('./jobs');
fetchJobListings().then(console.log);
```
If successful, this should return job listings.

### **2. Send a test message to Telex**
Use **Postman** or **cURL** to send a test message:
```bash
curl -X POST https://telex.example.com/api/send-message \
  -H "Content-Type: application/json" \
  -d '{
    "channel_id": "your-telex-channel-id",
    "message": "**Job Title**: React Developer\n**Company**: Remote Tech\n**Location**: Worldwide\n**URL**: https://remoteok.io/l/123456"
  }'

---

## 🚀 Deployment

1. **Host the backend** ( Render).
2. **Use the hosted URL** for Telex integration.
3. **Deploy your integration** to a Telex test organization.
4. **Ensure job alerts are posting correctly.**
