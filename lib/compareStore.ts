"use client";

const COMPARE_STORAGE_KEY = "compare_college_ids";
export const MAX_COMPARE_LIMIT = 3;

type Listener = () => void;
const listeners = new Set<Listener>();

let cachedIds: number[] | null = null;
let cachedRaw: string | null = null;

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    if (event.key === COMPARE_STORAGE_KEY) {
      cachedRaw = null;
      cachedIds = null;
      notifyListeners();
    }
  });
}

export function getCompareIds(): number[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(COMPARE_STORAGE_KEY) || "[]";
    if (raw === cachedRaw && cachedIds !== null) {
      return cachedIds;
    }
    cachedRaw = raw;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      cachedIds = parsed.map((id) => Number(id)).filter((id) => Number.isInteger(id) && id > 0);
      return cachedIds;
    }
  } catch (e) {
    console.error("Failed to parse compare IDs from localStorage:", e);
  }
  cachedIds = [];
  return cachedIds;
}

export function addCompareId(id: number): { success: boolean; message?: string } {
  const current = getCompareIds();
  if (current.includes(id)) {
    return { success: true };
  }
  if (current.length >= MAX_COMPARE_LIMIT) {
    return {
      success: false,
      message: `You can compare up to ${MAX_COMPARE_LIMIT} colleges.`,
    };
  }
  const updated = [...current, id];
  try {
    const raw = JSON.stringify(updated);
    localStorage.setItem(COMPARE_STORAGE_KEY, raw);
    cachedRaw = raw;
    cachedIds = updated;
    notifyListeners();
    return { success: true };
  } catch (e) {
    console.error("Failed to save compare IDs:", e);
    return { success: false, message: "Storage error occurred" };
  }
}

export function removeCompareId(id: number): void {
  const current = getCompareIds();
  const updated = current.filter((item) => item !== id);
  try {
    const raw = JSON.stringify(updated);
    localStorage.setItem(COMPARE_STORAGE_KEY, raw);
    cachedRaw = raw;
    cachedIds = updated;
    notifyListeners();
  } catch (e) {
    console.error("Failed to remove compare ID:", e);
  }
}

export function clearCompareIds(): void {
  try {
    localStorage.removeItem(COMPARE_STORAGE_KEY);
    cachedRaw = "[]";
    cachedIds = [];
    notifyListeners();
  } catch (e) {
    console.error("Failed to clear compare IDs:", e);
  }
}

export function isCompared(id: number): boolean {
  return getCompareIds().includes(id);
}

export function setCompareIds(ids: number[]): void {
  const validIds = ids.slice(0, MAX_COMPARE_LIMIT);
  try {
    const raw = JSON.stringify(validIds);
    localStorage.setItem(COMPARE_STORAGE_KEY, raw);
    cachedRaw = raw;
    cachedIds = validIds;
    notifyListeners();
  } catch (e) {
    console.error("Failed to set compare IDs:", e);
  }
}

export function subscribeCompare(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

