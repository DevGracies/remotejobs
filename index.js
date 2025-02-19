import express from "express";
import "dotenv/config";
import cron from "node-cron";
import fs from "fs";
import path from "path";
import { fetchJobListings, sendToTelex } from "./job.js";

const app = express();
app.use(express.json());

app.get("/integration.json", (req, res) => {
  const filePath = path.join(process.cwd(), "integration.json");
  fs.readFile(filePath, "utf8", (error, data) => {
    if (error) {
      return res.status(500).json({ error: "cant' read read" });
    }
    try {
      const json = JSON.parse(data);
      res.status(200).json(json);
    } catch (error) {
      res.status(500).json({ error: "error from json" });
    }
  });
});

cron.schedule("0 */3 * * *", async () => {
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
