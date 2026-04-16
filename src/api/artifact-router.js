import { downloadArtifact } from './download-handler.js';
import { holdToggle } from '../lib/hold-toggle.js';

function stripMarkdownWrappers(input) {
  if (typeof input !== 'string') return '';

  let text = input.trim();

  const fencedMatch = text.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  if (fencedMatch) {
    text = fencedMatch[1].trim();
  }

  const codeMatch = text.match(/^<pre><code>([\s\S]*?)<\/code><\/pre>$/i);
  if (codeMatch) {
    text = codeMatch[1].trim();
  }

  return text;
}

function routeArtifactByType(artifact) {
  if (!artifact || typeof artifact !== 'object') return null;

  switch (artifact.type) {
    case 'download':
    case 'file':
    case 'attachment':
      return downloadArtifact(artifact);
    default:
      return null;
  }
}

export function routeArtifacts(rawPayload) {
  if (holdToggle?.isHeld?.()) {
    return { aborted: true, reason: 'HOLD engaged' };
  }

  const normalized = stripMarkdownWrappers(rawPayload);
  let parsed;

  try {
    parsed = JSON.parse(normalized);
  } catch {
    return { artifacts: [], routed: 0, errors: ['Invalid JSON payload'] };
  }

  const artifacts = Array.isArray(parsed?.artifacts) ? parsed.artifacts : [];
  const results = [];

  for (const artifact of artifacts) {
    if (holdToggle?.isHeld?.()) {
      return {
        aborted: true,
        reason: 'HOLD engaged',
        artifacts: results,
        routed: results.length
      };
    }

    results.push(routeArtifactByType(artifact));
  }

  return {
    artifacts: results,
    routed: results.filter((item) => item !== null && item !== undefined).length
  };
}
