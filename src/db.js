import Dexie from "dexie";

export const db = new Dexie("Upsurge");
db.version(1).stores({
  games: "++id, data ,wasm,framework,loader, version", // Primary key and indexed props
});
