import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en-IN">
      <Head>
        {/* <!-- Google Tag Manager --> */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-10904587599"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function (w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
            var f = d.getElementsByTagName(s)[0],
              j = d.createElement(s),
              dl = l != "dataLayer" ? "&l=" + l : "";
            j.async = true;
            j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
            f.parentNode.insertBefore(j, f);
          })(window, document, "script", "dataLayer", "GTM-P32QRH6");`,
          }}
        ></script>

        {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-J0CR8296J0"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-J0CR8296J0');`,
          }}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-10904587599');`,
          }}
        ></script>

        {/* <!-- End Google Tag Manager --> */}
        {/* <!-- Facebook Pixel Code --> */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
  !function(f,b,e,v,n,t,s)
  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window,document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
   fbq('init', '301023181478444'); 
  fbq('track', 'PageView');
`,
          }}
        ></script>

        {/* <!-- End Facebook Pixel Code --> */}
      </Head>
      <body>
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P32QRH6"
            height="0" width="0" style="display:none;visibility:hidden">`,
          }}
        ></noscript>
        <noscript>
          <img
            height="1"
            width="1"
            alt=""
            src="https://www.facebook.com/tr?id=301023181478444&ev=PageView
&noscript=1"
          />
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
