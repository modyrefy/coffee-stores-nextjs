import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {/*<title>Coffee Store</title>*/}
                    <link
                        rel="preload"
                        href="/fonts/IBMPlexSans-Bold.ttf"
                        as="font"
                        crossOrigin="anonymous"
                    ></link>
                    <link
                        rel="preload"
                        href="/fonts/IBMPlexSans-Regular.ttf"
                        as="font"
                        crossOrigin="anonymous"
                    ></link>
                    <link
                        rel="preload"
                        href="/fonts/IBMPlexSans-SemiBold.ttf"
                        as="font"
                        crossOrigin="anonymous"
                    ></link>
                </Head>
                <body>
                <Main></Main>
                <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;


// import  { Head, Html, Main, NextScript } from "next/document";
// export default function Document() {
//     return (
//         <Html lang="en">
//             <Head>
//                 {/*<title>Coffee Store</title>*/}
//                 <link
//                     rel="preload"
//                     href="/fonts/IBMPlexSans-Bold.ttf"
//                     as="font"
//                     crossOrigin="anonymous"
//                 ></link>
//                 <link
//                     rel="preload"
//                     href="/fonts/IBMPlexSans-Regular.ttf"
//                     as="font"
//                     crossOrigin="anonymous"
//                 ></link>
//                 <link
//                     rel="preload"
//                     href="/fonts/IBMPlexSans-SemiBold.ttf"
//                     as="font"
//                     crossOrigin="anonymous"
//                 ></link>
//             </Head>
//             <body>
//             <Main>
//             </Main>
//             <NextScript />
//             </body>
//         </Html>
//     );
// }
