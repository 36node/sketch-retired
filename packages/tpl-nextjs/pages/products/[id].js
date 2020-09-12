import React, { useEffect } from "react";
import Head from "next/head";
import styled from "styled-components";
import { useRouter } from "next/router";


export async function getServerSideProps(context) {
  const param = context.params.id;

  return { props: { param } };
}

export default function Detail({ param }) {
  const router = useRouter();
  const { id } = router.query;


  return (
    <div>
      <Head>
        <title>产品页</title>
        <link
          rel="stylesheet"
          type="text/css"
          href="//at.alicdn.com/t/font_1837197_4wug0eytmu6.css"
        />
      </Head>
    </div>
  );
}
