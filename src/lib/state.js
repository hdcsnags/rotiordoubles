const STORAGE_PREFIX = 'session87:';
const drawerStorageKey = `${STORAGE_PREFIX}drawerOpen`;

const stateData = Object.create(null);
const subscribers = new Map();

function canUseLocalStorage() {
  try {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  } catch {
    return false;
  }
}

function readPersistedDrawerState() {
  if (!canUseLocalStorage()) return undefined;
  try {
    const raw = window.localStorage.getItem(drawerStorageKey);
    if (raw === null) return undefined;
    return raw === 'true';
  } catch {
    return undefined;
  }
}

function persistDrawerState(value) {
  if (!canUseLocalStorage()) return;
  try {
    window.localStorage.setItem(drawerStorageKey, String(Boolean(value)));
  } catch {
    // ignore persistence failures
  }
}

const initialDrawerState = readPersistedDrawerState();
if (typeof initialDrawerState !== 'undefined') {
  stateData.drawerOpen = initialDrawerState;
}

function emit(key, value) {
  const set = subscribers.get(key);
  if (!set || set.size === 0) return;
  for (const callback of Array.from(set)) {
    callback(value, key, state);
  }
}

const state = {
  get(key) {
    return stateData[key];
  },

  set(key, value) {
    stateData[key] = value;
    if (key === 'drawerOpen') {
      persistDrawerState(value);
    }
    emit(key, value);
    return value;
  },

  subscribe(key, callback) {
    if (!subscribers.has(key)) {
      subscribers.set(key, new Set());
    }
    const set = subscribers.get(key);
    set.add(callback);
    return () => {
      const current = subscribers.get(key);
      if (!current) return;
      current.delete(callback);
      if (current.size === 0) {
        subscribers.delete(key);
      }
    };
  }
};

export default state;
