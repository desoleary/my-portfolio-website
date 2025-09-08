import type { NextApiRequest, NextApiResponse } from 'next';
import { env } from './env';
import { resolvePersisted } from './persisted';
import { forwardableHeaders } from './headers';
import { withTimeout } from './timeouts';

export async function graphqlProxy(req: NextApiRequest, res: NextApiResponse) {
    const persisted = resolvePersisted(req.query.id);
    const isGet = req.method === 'GET';
    const body = persisted
        ? { query: persisted, variables: isGet ? {} : (req.body?.variables ?? {}) }
        : req.body;

    const headers = forwardableHeaders(req);
    headers.set('content-type', 'application/json');

    const t = withTimeout(10_000);
    try {
        const upstream = await fetch(env.NEST_GRAPHQL_URL, {
            method: req.method,
            headers,
            body: isGet ? undefined : JSON.stringify(body),
            signal: t.signal
        });
        res.setHeader('Cache-Control', 'private, max-age=0, must-revalidate');
        res.status(upstream.status).send(await upstream.text());
    } catch (err: any) {
        res.status(err?.name === 'AbortError' ? 504 : 502).json({ errors: [{ message: err?.message || 'Upstream error' }] });
    } finally {
        t.clear();
    }
}