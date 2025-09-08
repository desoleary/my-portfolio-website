import type { NextApiRequest, NextApiResponse } from 'next';
import { graphqlProxy } from '@graphql/server/proxy';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return graphqlProxy(req, res);
}