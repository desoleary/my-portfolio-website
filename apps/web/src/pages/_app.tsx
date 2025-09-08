import type { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { ConfigProvider, theme as antdTheme } from 'antd';
import 'antd/dist/reset.css';
import '../styles/globals.css';

if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { loadDevMessages, loadErrorMessages } = require('@apollo/client/dev');
    loadDevMessages(); loadErrorMessages();
}

const httpLink = new HttpLink({
    uri: '/api/graphql',
    credentials: 'include',
    fetchOptions: { cache: 'no-store' }
});
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (process.env.NODE_ENV !== 'production') {
        if (graphQLErrors) graphQLErrors.forEach(({ message, path }) => console.warn('[GraphQL error]', { message, path }));
        if (networkError) console.warn('[Network error]', networkError);
    }
});
const client = new ApolloClient({ link: from([errorLink, httpLink]), cache: new InMemoryCache() });

const PRIMARY = '#6C4CF5';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ApolloProvider client={client}>
            <ConfigProvider
                theme={{
                    algorithm: antdTheme.defaultAlgorithm,
                    token: { colorPrimary: PRIMARY, borderRadius: 8 },
                    components: { Button: { controlHeight: 40, fontWeight: 600 }, Layout: { headerBg: '#0f2437', headerColor: '#fff' } }
                }}
            >
                <DefaultSeo titleTemplate="%s | Portfolio" defaultTitle="Des O'Leary — Portfolio" openGraph={{ type: 'website', site_name: 'Des Portfolio' }} />
                <Component {...pageProps} />
            </ConfigProvider>
        </ApolloProvider>
    );
}