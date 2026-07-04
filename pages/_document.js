import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="stylesheet" href="/style/style.css" />
        <link rel="shortcut icon" href="/assets/berry.png" type="image/x-icon" />
        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        {/* Animate.css Compatibility Mode */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.compat.css"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script defer src="/script/script.js"></script>
      </body>
    </Html>
  );
}
