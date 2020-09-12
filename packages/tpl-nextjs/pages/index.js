import Head from "next/head";
import styled from "styled-components";
import fetch from "node-fetch";

export async function getServerSideProps() {
  // const res = await fetch(
  //   ``,
  //   {
  //     headers: {
  //       "Access-Control-Allow-Origin": "*",
  //       Authorization: `Bearer`,
  //     },
  //   }
  // );
  // const data = await res.json();
  return { props: { data: {} } };
}

export default function Home({ nav = [] }) {
  return (
    <div>
      <Head>
        <title>首页</title>
        <link
          rel="stylesheet"
          type="text/css"
          href="//at.alicdn.com/t/font_1837197_4wug0eytmu6.css"
        />
      </Head>

      <div>
        Hello world!
      </div>
    </div>
  );
}