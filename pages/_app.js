import Head from 'next/head';
import '../styles/global.css';

function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Login JWT</title>
                <link
                    rel="shortcut icon"
                    href="/images/favicon.ico"
                />
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                />
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default App;
