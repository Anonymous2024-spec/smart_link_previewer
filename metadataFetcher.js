const axios = require("axios");
const cheerio = require("cheerio");

async function fetchMetadata(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Try to extract Open Graph data
    const title =
      $('meta[property="og:title"]').attr("content") || $("title").text();
    const description =
      $('meta[property="og:description"]').attr("content") || "";
    const image = $('meta[property="og:image"]').attr("content") || "";

    return { title, description, image };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return null;
  }
}

module.exports = { fetchMetadata };
