import type { NextPage } from "next";
import PageBody from "../components/PageBody";
import HeadTag from "../components/HeadTag";

const Home: NextPage = () => {
  return (
    <>
      <HeadTag
        title="Atomic"
        content="Next Gen Gallery"
        faviconUrl="/favicon.png"
        seo={{ title: "", content: "", image: "" }}
      />
      <PageBody>Atomic..</PageBody>
    </>
  );
};

export default Home;
