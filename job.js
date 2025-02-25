import axios from "axios";
import config from "./config/default.js";
const { keywords, REMOTEOK_API_URL, TELEX_API_URL } = config;

export async function fetchJobListings() {
  try {
    const response = await axios.get(REMOTEOK_API_URL);
    return response.data.filter((job) =>
      keywords.some((keyword) =>
        job.position?.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  } catch (error) {
    console.error("Error fetching job listings: ", error);
    return [];
  }
}

export async function sendToTelex(job) {
  try {
    const message = `**Job Title**: ${job.position}\n**Company**: ${job.company}\n**Location** ${job.location}\n **URL**: ${job.url}`;

    await axios.post(TELEX_API_URL, {
      username: "olori",
      event_name: "daily_job_alert",
      status: "success",
      message: message,
    });
    console.log(`Job sent to Telex: ${job.position}`);
  } catch (error) {
    console.error("Error sending job to Telex: ", error);
  }
}

// fetchJobListings().then(console.log);
sendToTelex().then(console.log);
console.log(config);
