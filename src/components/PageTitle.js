import Head from "next/head";

export default function PageTitle({
  title = `upsurge | The Best Financial Literacy Platform for Kids and School Students in India`,
  content = `Get the ultimate Financial Literacy Platform for Kids with Educational Games and Courses- tailored learning pathways based on individual needs and learning styles.`,
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={content} />
    </Head>
  );
}
