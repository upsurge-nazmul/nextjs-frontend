import Head from "next/head";

const Seo = (props) => (
  <Head>
    <title>{props.title}</title>
    <meta name="description" content={props.desc} />
    <meta property="og:type" content="website" />
    <meta name="og:title" property="og:title" content={props.title} />
    <meta
      name="og:description"
      property="og:description"
      content={props.desc}
    />
    <meta property="og:site_name" content="upsurge" />
    <meta property="og:url" content={`${props.canonical}`} />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={props.title} />
    <meta name="twitter:description" content={props.desc} />
    <meta name="twitter:site" content="@upsurge" />
    <meta name="twitter:creator" content="@upsurge" />
    <meta charSet="utf-8" />
    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
    <link rel="manifest" href="/manifest.json" />
    <link rel="apple-touch-icon" sizes="180x180" href="/public/apple-touch-icon.png?v=1.5" />
    <link rel="icon" type="image/png" sizes="32x32" href="/public/favicon-32x32.png?v=1.5" />
    <link rel="icon" type="image/png" sizes="16x16" href="/public/favicon-16x16.png?v=1.5" />
    <link rel="mask-icon" href="/public/safari-pinned-tab.svg?v=1.5" color="#17d1bc" />
    <link rel="shortcut icon" href="/public/favicon.ico?v=1.5" />
    <meta name="msapplication-TileColor" content="#17d1bc" />
    <meta name="msapplication-TileImage" content="/public/mstile-144x144.png?v=1.5" />
    <meta name="msapplication-config" content="/public/browserconfig.xml?v=1.5" />
    <meta name="theme-color" content="#ffffff" />
    {props.css && <link rel="stylesheet" href={`${props.css}`} />}
    {/* {props.image ? (
      <meta property="og:image" content={`${props.image}`} />
    ) : (
      <meta
        property="og:image"
        content="https://www.propernoun.co/images/proper-noun-social.png"
      />
    )} */}
    {props.image && <meta name="twitter:image" content={`${props.image}`} />}
    {props.canonical && <link rel="canonical" href={`${props.canonical}`} />}
  </Head>
);
export default Seo;
