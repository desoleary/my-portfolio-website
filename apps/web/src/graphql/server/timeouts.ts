export function withTimeout(ms: number) {
  const ac = new AbortController()
  const t = setTimeout(() => ac.abort(new Error('fetch timeout')), ms)
  return { signal: ac.signal, clear: () => clearTimeout(t) }
}
