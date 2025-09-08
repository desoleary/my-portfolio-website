import fs from "node:fs";
import path from "node:path";

import { graphqlProxy } from '@graphql/server/proxy'

import type { NextApiRequest, NextApiResponse } from 'next'

let persistedCache: Record<string, string> | null = null;

function getPersisted() {
  if (persistedCache) return persistedCache;
  try {
    const p = path.join(process.cwd(), "src", "persisted-queries.json");
    persistedCache = JSON.parse(fs.readFileSync(p, "utf8"));
  } catch { persistedCache = {}; }
  return persistedCache;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  getPersisted();
  return graphqlProxy(req, res)
}
