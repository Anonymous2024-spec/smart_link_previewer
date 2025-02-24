function renderPreview(metadata) {
    if (!metadata) {
      return 'Link preview not available.';
    }
    
    return `
      **${metadata.title}**
      ${metadata.description}
      ![Thumbnail](${metadata.image})
    `;
  }
  
  module.exports = { renderPreview };
  