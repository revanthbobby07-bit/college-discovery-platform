"use client";

import { useSyncExternalStore } from "react";
import {
  getCompareIds,
  addCompareId,
  removeCompareId,
  clearCompareIds,
  isCompared,
  subscribeCompare,
  setCompareIds,
} from "@/lib/compareStore";

const emptyArray: number[] = [];

function getClientSnapshot(): number[] {
  return getCompareIds();
}

function getServerSnapshot(): number[] {
  return emptyArray;
}

export function useCompare() {
  const compareIds = useSyncExternalStore(
    subscribeCompare,
    getClientSnapshot,
    getServerSnapshot
  );

  const count = compareIds.length;

  const add = (id: number) => addCompareId(id);
  const remove = (id: number) => removeCompareId(id);
  const clear = () => clearCompareIds();
  const checkIsCompared = (id: number) => isCompared(id);
  const setAll = (ids: number[]) => setCompareIds(ids);

  return {
    compareIds,
    count,
    add,
    remove,
    clear,
    isCompared: checkIsCompared,
    setAll,
    isMounted: true,
  };
}

