// apps/web/src/pages/_app.tsx
import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
    from,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import 'antd/dist/reset.css';

// Optional: richer Apollo warnings/errors in dev (kept out of prod bundles)
if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { loadDevMessages, loadErrorMessages } = require('@apollo/client/dev');
    loadDevMessages();
    loadErrorMessages();
}

// Use the Next BFF so cookies/headers stay same-origin and persisted queries can work
const httpLink = new HttpLink({
    uri: '/api/graphql',
    credentials: 'include',           // future-proof if you add cookie-based auth
    fetchOptions: { cache: 'no-store' } // avoid caching issues during dev
});

// Lightweight client-side error logging (safe to keep)
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (process.env.NODE_ENV !== 'production') {
        if (graphQLErrors) {
            // eslint-disable-next-line no-console
            graphQLErrors.forEach(({ message, path }) =>
                console.warn('[GraphQL error]', { message, path })
            );
        }
        if (networkError) {
            // eslint-disable-next-line no-console
            console.warn('[Network error]', networkError);
        }
    }
});

const client = new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache() // ✅ no deprecated options like `canonizeResults`
});

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <DefaultSeo
                titleTemplate="%s | Portfolio"
                defaultTitle="Des O'Leary — Portfolio"
                openGraph={{ type: 'website', site_name: 'Des Portfolio' }}
            />
            <Component {...pageProps} />
        </ApolloProvider>
    );
}