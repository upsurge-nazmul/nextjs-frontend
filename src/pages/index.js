import React from "react";
import Home from "../components/Home";
import BlogApis from "../actions/apis/BlogApis";

export async function getStaticProps() {
  let res = await BlogApis.gethomeblogs();
  let blog_data = [];
  if (res && res.data && res.data.success) {
    blog_data = res.data.data;
  }
  // By returning { props: { blog_data } }, the Blog component
  // will receive `blog_data` as a prop at build time
  return {
    props: {
      blog_data,
    },
  };
}

function LandingPage(props) {
  return <Home {...props} />;
}

export default LandingPage;
