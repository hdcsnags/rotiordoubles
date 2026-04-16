import { state } from './state.js';

const APPROVAL_GATE_NAMESPACE = 'approvalGates';

function ensureNamespace() {
  if (!state[APPROVAL_GATE_NAMESPACE] || typeof state[APPROVAL_GATE_NAMESPACE] !== 'object') {
    state[APPROVAL_GATE_NAMESPACE] = {};
  }
  return state[APPROVAL_GATE_NAMESPACE];
}

function validateGateId(gateId) {
  if (typeof gateId !== 'string' || gateId.trim() === '') {
    throw new Error('approval-gate: gateId must be a non-empty string');
  }
  return gateId;
}

function cloneMeta(meta) {
  if (meta === undefined) return {};
  if (meta === null || typeof meta !== 'object') return { value: meta };
  try {
    return structuredClone(meta);
  } catch {
    return JSON.parse(JSON.stringify(meta));
  }
}

function getGateRecord(gateId) {
  const namespace = ensureNamespace();
  return namespace[gateId] || null;
}

export function requestApproval(gateId, meta = {}) {
  validateGateId(gateId);
  const namespace = ensureNamespace();
  const existing = namespace[gateId];

  if (existing && existing.resolved === true) {
    return { ...existing, meta: cloneMeta(existing.meta) };
  }

  const record = {
    gateId,
    meta: cloneMeta(meta),
    resolved: false,
    requestedAt: existing?.requestedAt || new Date().toISOString(),
    resolvedAt: null,
    resolver: null
  };

  namespace[gateId] = record;
  return { ...record, meta: cloneMeta(record.meta) };
}

export function resolve(gateId) {
  validateGateId(gateId);
  const namespace = ensureNamespace();
  const record = namespace[gateId];

  if (!record) {
    throw new Error(`approval-gate: no approval request exists for gateId "${gateId}"`);
  }

  if (record.resolved === true) {
    return { ...record, meta: cloneMeta(record.meta) };
  }

  record.resolved = true;
  record.resolvedAt = new Date().toISOString();
  record.resolver = 'operator';
  namespace[gateId] = record;
  return { ...record, meta: cloneMeta(record.meta) };
}

export function isResolved(gateId) {
  validateGateId(gateId);
  const record = getGateRecord(gateId);
  return !!(record && record.resolved === true);
}

export function assertResolved(gateId) {
  if (!isResolved(gateId)) {
    throw new Error(`approval-gate: unresolved gate "${gateId}" cannot be bypassed`);
  }
}

export function getApprovalGate(gateId) {
  validateGateId(gateId);
  const record = getGateRecord(gateId);
  return record ? { ...record, meta: cloneMeta(record.meta) } : null;
}
