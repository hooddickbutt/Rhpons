"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";

export type LocalRecord = {
  id: string;
  kind: "payment" | "request" | "swap";
  title: string;
  amount: string;
  asset: string;
  counterparty: string;
  status: "confirmed" | "pending" | "failed";
  simulated: boolean;
  hash?: string;
  createdAt: string;
  filter: "payments" | "swaps" | "rewards" | "token" | "system";
};

type SessionData = {
  preview: boolean;
  records: LocalRecord[];
  showActivity: boolean;
};

type SessionValue = SessionData & {
  setPreview: (value: boolean) => void;
  addRecord: (record: LocalRecord) => void;
  setShowActivity: (value: boolean) => void;
};

const KEY = "vire-session-v1";
const empty: SessionData = { preview: false, records: [], showActivity: true };
let current = empty;
let loaded = false;
const listeners = new Set<() => void>();

function readStorage(): SessionData {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<SessionData>;
    return {
      preview: Boolean(parsed.preview),
      records: Array.isArray(parsed.records) ? parsed.records : [],
      showActivity: parsed.showActivity !== false,
    };
  } catch {
    return empty;
  }
}

function getSnapshot() {
  if (!loaded) {
    loaded = true;
    current = readStorage();
  }
  return current;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function commit(next: SessionData) {
  current = next;
  loaded = true;
  localStorage.setItem(KEY, JSON.stringify(next));
  listeners.forEach((listener) => listener());
}

const SessionContext = createContext<SessionValue | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const data = useSyncExternalStore(subscribe, getSnapshot, () => empty);
  const value = useMemo<SessionValue>(
    () => ({
      ...data,
      setPreview: (preview) => commit({ ...getSnapshot(), preview }),
      setShowActivity: (showActivity) => commit({ ...getSnapshot(), showActivity }),
      addRecord: (record) => {
        const snapshot = getSnapshot();
        commit({ ...snapshot, records: [record, ...snapshot.records].slice(0, 40) });
      },
    }),
    [data],
  );
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const value = useContext(SessionContext);
  if (!value) throw new Error("SessionProvider is missing");
  return value;
}
