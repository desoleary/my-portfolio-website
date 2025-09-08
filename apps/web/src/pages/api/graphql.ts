import { graphqlProxy } from '@graphql/server/proxy'

import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return graphqlProxy(req, res)
}
