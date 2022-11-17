import Head from 'next/head';
import '../styles/global.css';

function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Login JWT</title>
                <link rel="shortcut icon" href="/images/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </>
    );
}

export default App;
