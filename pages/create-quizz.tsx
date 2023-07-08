// React
import React, { ReactElement } from "react";
// Next
import dynamic from "next/dynamic";
// SEO messages
import { SEO_CREATE_QUIZZ_TITLE } from "@/messages/seo";
// Components
const PageHeading = dynamic(() => import("@/components/PageHeading"));
const PageSEO = dynamic(() => import("@/components/PageSEO"));
const QuizzDetails = dynamic(() => import("@/components/Forms/QuizzDetails"));
const Container = dynamic(() => import("@/components/Container"));
const Layout = dynamic(() => import("@/components/AppLayout"));

const CreateQuizzPage = () => {
  return (
    <>
      <PageSEO title={SEO_CREATE_QUIZZ_TITLE} />
      <PageHeading title="Create Quizz" />
      <Container>
        <QuizzDetails type="add" />
      </Container>
    </>
  );
};

export default CreateQuizzPage;

CreateQuizzPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
