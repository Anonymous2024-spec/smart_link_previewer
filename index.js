const express = require("express");
const path = require("path");
const { extractUrls } = require("./urlParser");
const { fetchMetadata } = require("./metadataFetcher");
const { renderPreview } = require("./previewRenderer");

const app = express();
const port = 3000;

const cors = require("cors");
app.use(cors());
app.use(express.json());

// Serve the integration.json file
app.get("/smart-link-previewer/integration.json", (req, res) => {
  res.sendFile(path.join(__dirname, "integration.json"));
});

// Endpoint to process Telex messages
app.post("/process-message", async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).send("No message provided");
  }

  const urls = extractUrls(message);
  if (urls.length === 0) {
    return res.send({ preview: "No URL found in message." });
  }

  // Process the first URL only
  const metadata = await fetchMetadata(urls[0]);
  const preview = renderPreview(metadata);

  res.send({ preview });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
