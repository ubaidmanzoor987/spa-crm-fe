import Head from "next/head";
import Home from "@/pages/home/index.page";

export default function LandingPage() {
  return (
    <>
      <Head>
        <title>SPA-CRM</title>
      </Head>
      <Home />
    </>
  );
}

