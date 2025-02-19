import express from "express";
import "dotenv/config";
import cron from "node-cron";

import { fetchJobListings, sendToTelex } from "./job.js";

const app = express();
app.use(express.json());

cron.schedule("*/3 * * * * *", async () => {
  try {
    console.log("Fetching job listings...");
    const jobListings = await fetchJobListings();
    console.log(`Found ${jobListings.length} new jobs`);

    for (const job of jobListings) {
      await sendToTelex(job);
    }

    console.log("Job listings sent successfully!");
  } catch (error) {
    console.error("Error fetching or sending jobs:", error);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Tech Job Alerts Integration running on port ${PORT}`);
});
