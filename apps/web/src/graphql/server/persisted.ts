import fs from 'node:fs';
import path from 'node:path';
import { isDev } from './env';

const mapPath = path.join(process.cwd(), 'src', 'persisted-queries.json');
let cache: Record<string, string> | null = null;

function load(): Record<string,string> {
    try { return JSON.parse(fs.readFileSync(mapPath, 'utf8')); } catch { return {}; }
}
export function getPersistedMap(){ if(isDev) return load(); if(!cache) cache = load(); return cache!; }
export function resolvePersisted(id?: string | string[]){ return typeof id === 'string' ? (getPersistedMap()[id] ?? null) : null; }