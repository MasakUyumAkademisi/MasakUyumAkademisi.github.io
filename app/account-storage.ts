let owner = "guest";
export function setStorageOwner(id: string | null) { owner = id ?? "guest"; }
export function accountStorageKey(key: string) { return owner === "guest" ? key : `${key}:account:${owner}`; }
