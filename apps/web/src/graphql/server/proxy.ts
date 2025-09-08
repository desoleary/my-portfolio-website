import { env } from './env'
import { forwardableHeaders } from './headers'
import { resolvePersisted } from './persisted'
import { withTimeout } from './timeouts'

import type { NextApiRequest, NextApiResponse } from 'next'

export async function graphqlProxy(req: NextApiRequest, res: NextApiResponse) {
  const persisted = resolvePersisted(req.query.id)
  const isGet = req.method === 'GET'
  const body = persisted ? { query: persisted, variables: isGet ? {} : (req.body?.variables ?? {}) } : req.body

  const headers = forwardableHeaders(req)
  headers.set('content-type', 'application/json')

  const t = withTimeout(10_000)
  try {
    const upstream = await fetch(env.NEST_GRAPHQL_URL, {
      method: req.method,
      headers,
      body: isGet ? undefined : JSON.stringify(body),
      signal: t.signal
    })
    res.setHeader('Cache-Control', 'private, max-age=0, must-revalidate')
    res.status(upstream.status).send(await upstream.text())
  } catch (err: unknown) {
    const aborted = typeof err === 'object' && err !== null && (err as { name?: string }).name === 'AbortError'
    const message = err instanceof Error ? err.message : 'Upstream error'
    res.status(aborted ? 504 : 502).json({ errors: [{ message }] })
  } finally {
    t.clear()
  }
}
