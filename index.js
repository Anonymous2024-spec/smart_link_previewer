const express = require("express");
const { extractUrls } = require("./urlParser");
const { fetchMetadata } = require("./metadataFetcher");
const { renderPreview } = require("./previewRenderer");

const app = express();
const port = 3000;

app.use(express.json());

// Endpoint to simulate processing a Telex message
app.post("/process-message", async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).send("No message provided");
  }

  const urls = extractUrls(message);
  if (urls.length === 0) {
    return res.send({ preview: "No URL found in message." });
  }

  // For demonstration, we process the first URL only
  const metadata = await fetchMetadata(urls[0]);
  const preview = renderPreview(metadata);

  res.send({ preview });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
