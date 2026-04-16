import { state } from './state.js';

const HOLD_STATE_KEY = 'hold';
const listeners = new Set();
let initialized = false;
let currentHeld = false;

function readStoredHold() {
  try {
    if (state && typeof state.get === 'function') {
      return Boolean(state.get(HOLD_STATE_KEY));
    }
  } catch {
    // Ignore storage/state read failures and fall back to false.
  }
  return false;
}

function writeStoredHold(value) {
  try {
    if (state && typeof state.set === 'function') {
      state.set(HOLD_STATE_KEY, Boolean(value));
    }
  } catch {
    // Ignore storage/state write failures.
  }
}

function notify(held) {
  for (const callback of Array.from(listeners)) {
    try {
      callback(held);
    } catch {
      // Keep notifying other subscribers even if one fails.
    }
  }
}

function initialize() {
  if (initialized) return;
  initialized = true;
  currentHeld = readStoredHold();
}

function setHeld(nextHeld) {
  initialize();
  const held = Boolean(nextHeld);
  if (held === currentHeld) return currentHeld;
  currentHeld = held;
  writeStoredHold(currentHeld);
  notify(currentHeld);
  return currentHeld;
}

export function engage() {
  return setHeld(true);
}

export function disengage() {
  return setHeld(false);
}

export function isHeld() {
  initialize();
  return currentHeld;
}

export function onHoldChange(callback) {
  if (typeof callback !== 'function') {
    throw new TypeError('onHoldChange(callback) requires a function');
  }
  initialize();
  listeners.add(callback);
  callback(currentHeld);
  return () => {
    listeners.delete(callback);
  };
}
