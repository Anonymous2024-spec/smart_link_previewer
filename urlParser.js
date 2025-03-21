// Simple URL extraction using regex
function extractUrls(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.match(urlRegex) || [];
  }
  
  module.exports = { extractUrls };
  