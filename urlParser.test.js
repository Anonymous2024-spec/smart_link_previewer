const { extractUrls } = require("./urlParser");

test("extracts URLs from text", () => {
  const text = "Visit https://example.com for more info.";
  const urls = extractUrls(text);
  expect(urls).toEqual(["https://example.com"]);
});
