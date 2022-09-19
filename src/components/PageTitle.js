import Head from "next/head";

export default function PageTitle({
  title = "upsurge",
  content = `Best platform for promoting financial literacy, entrepreneurship & modern skills for school students in India by upsurge`,
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={content} />
    </Head>
  );
}
