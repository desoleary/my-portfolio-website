import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { ConfigProvider } from 'antd'
import { DefaultSeo } from 'next-seo'

import { baseTheme } from '@components/../theme/theme';

import type { AppProps } from 'next/app'
import 'antd/dist/reset.css'
import '@styles/globals.css';


if (process.env.NODE_ENV !== 'production') {
  // dynamic import kept out of prod bundle
  import('@apollo/client/dev')
    .then(({ loadDevMessages, loadErrorMessages }) => {
      loadDevMessages()
      loadErrorMessages()
    })
    .catch(reason => {
      console.error(reason)
    })
}

const httpLink = new HttpLink({
  uri: '/api/graphql',
  credentials: 'include',
  fetchOptions: { cache: 'no-store' }
})
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (process.env.NODE_ENV !== 'production') {
    if (graphQLErrors) graphQLErrors.forEach(({ message, path }) => console.warn('[GraphQL error]', { message, path }))
    if (networkError) console.warn('[Network error]', networkError)
  }
})
const client = new ApolloClient({ link: from([errorLink, httpLink]), cache: new InMemoryCache() })

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ConfigProvider
          theme={baseTheme}
      >
        <DefaultSeo
          titleTemplate='%s | Portfolio'
          defaultTitle="Des O'Leary — Portfolio"
          openGraph={{ type: 'website', site_name: 'Des Portfolio' }}
        />
        <Component {...pageProps} />
      </ConfigProvider>
    </ApolloProvider>
  )
}
