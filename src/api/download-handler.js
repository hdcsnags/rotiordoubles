export function downloadArtifact(artifact) {
  if (!artifact || typeof artifact !== 'object') {
    throw new Error('Invalid artifact: expected an object.');
  }

  const { filename, mimeType, content } = artifact;

  if (!filename) {
    throw new Error('Invalid artifact: filename is required.');
  }

  if (content === undefined || content === null) {
    throw new Error('Invalid artifact: content is required.');
  }

  const blob = new Blob([content], {
    type: mimeType || 'application/octet-stream'
  });

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = 'none';

  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
