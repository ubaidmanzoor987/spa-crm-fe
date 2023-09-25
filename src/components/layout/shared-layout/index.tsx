import Head from "next/head";
import { Container } from "@mui/material";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { AppState } from "@/store/rootReducer";
import { IRole } from "@/store/auth/types";
import Sidebar from "../sidebar";

interface SharedLayoutProps {
  children: ReactNode;
  title: string;
}

const SharedLayout = ({ title, children }: SharedLayoutProps) => {

  return (
    <Container maxWidth={false}>
      <Head>
        <title>SPA-CRM | {title}</title>
      </Head>
      <Sidebar children={children} pageTitle={title} />;
    </Container>
  );
};

export default SharedLayout;
