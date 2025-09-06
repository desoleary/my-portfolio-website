import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'node:fs';
import path from 'node:path';

const NEST_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:4000/graphql';
const mapPath = path.join(process.cwd(), 'src', 'persisted-queries.json');

// Load persisted map if present
let persisted: Record<string, string> = {};
try {
  persisted = JSON.parse(fs.readFileSync(mapPath, 'utf8'));
} catch (_) {}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const isPersisted = typeof req.query.id === 'string' && persisted[req.query.id as string];
  const body = isPersisted
    ? { query: persisted[req.query.id as string], variables: (req.method === 'GET' ? {} : req.body?.variables) ?? {} }
    : req.body;

  const upstream = await fetch(NEST_URL, {
    method: req.method,
    headers: { 'content-type': 'application/json' },
    body: req.method === 'GET' ? undefined : JSON.stringify(body)
  });

  res.setHeader('Cache-Control', 'private, max-age=0, must-revalidate');
  const data = await upstream.text();
  res.status(upstream.status).send(data);
}
