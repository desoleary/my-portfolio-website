import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import React from 'react'

import type { AppProps } from 'next/app'

export default class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const cache = createCache()
        const originalRenderPage = ctx.renderPage

        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp:
                    (App: React.ComponentType<AppProps>) =>
                        (props: AppProps) => (
                            <StyleProvider cache={cache}>
                                <App {...props} />
                            </StyleProvider>
                        )
            })

        const initialProps = await Document.getInitialProps(ctx)
        const styleText = extractStyle(cache, true)
        return {
            ...initialProps,
            styles: (
                <>
                    {initialProps.styles}
                    <style id='antd-cssinjs' dangerouslySetInnerHTML={{ __html: styleText }} />
                </>
            )
        }
    }

    render() {
        return (
            <Html lang='en'>
                <Head />
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        )
    }
}
