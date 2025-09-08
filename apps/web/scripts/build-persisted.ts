import { createHash } from 'node:crypto'
import { writeFileSync, readFileSync } from 'node:fs'

import fg from 'fast-glob'

// Naive extractor: finds gql`...` template blocks
const GQL_TAG = /gql`([\s\S]*?)`/g

async function main() {
  // scan TS/TSX under src
  const files = await fg(['src/**/*.{ts,tsx}'], { dot: false })

  const map: Record<string, string> = {}
  for (const f of files) {
    const src = readFileSync(f, 'utf8')
    let m: RegExpExecArray | null
    while ((m = GQL_TAG.exec(src))) {
      const q = m[1].trim()
      const id = createHash('sha256').update(q).digest('hex').slice(0, 12)
      map[id] = q
    }
  }

  writeFileSync('src/persisted-queries.json', JSON.stringify(map, null, 2))

  console.log(`Persisted ${Object.keys(map).length} queries.`)
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
