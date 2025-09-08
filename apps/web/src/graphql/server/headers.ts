import type { NextApiRequest } from 'next';

const ALLOW = new Set(['accept','content-type','authorization','cookie','x-request-id','x-forwarded-for','user-agent']);

export function forwardableHeaders(req: NextApiRequest): Headers {
    const h = new Headers();
    for (const [k, v] of Object.entries(req.headers)) {
        const key = k.toLowerCase();
        if (!ALLOW.has(key)) continue;
        if (Array.isArray(v)) v.forEach(val => h.append(key, val));
        else if (typeof v === 'string') h.set(key, v);
    }
    return h;
}