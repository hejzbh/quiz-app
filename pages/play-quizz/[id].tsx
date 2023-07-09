// React
import React, { ReactElement } from "react";
// Next
import dynamic from "next/dynamic";
import { GetStaticPropsContext } from "next";
// Messages
import { GET_QUIZZ_DETAILS_ERROR } from "@/messages/errors";
import { SEO_PLAY_QUIZZ } from "@/messages/seo";
import { PLAY_QUIZZ_DESCRIPTION } from "@/messages/quizzes";
// API
import { fetchAPI } from "@/api/fetchAPI";
// Enums & Interfaces
import { APIEndpoints, APIMethods } from "@/ts/enums";
import { APIError, Quizz } from "@/ts/interfaces";
// Components
const PageHeading = dynamic(() => import("@/components/PageHeading"));
const PageSEO = dynamic(() => import("@/components/PageSEO"));
const Container = dynamic(() => import("@/components/Container"));
const NotFound = dynamic(() => import("@/components/NoResultsFound"));
const Layout = dynamic(() => import("@/components/AppLayout"));
const PlayQuizz = dynamic(() => import("@/components/PlayQuizz"));

interface QuizzPageProps {
  quizzDetails: Quizz | APIError;
}

const QuizzPage = ({ quizzDetails }: QuizzPageProps) => {
  return (
    <>
      <PageSEO title={(quizzDetails as Quizz)?.name || SEO_PLAY_QUIZZ} />
      <PageHeading
        title={(quizzDetails as Quizz)?.name || "Not found"}
        description={PLAY_QUIZZ_DESCRIPTION}
      />
      <Container>
        {(quizzDetails as Quizz)?.id ? (
          <PlayQuizz quizz={quizzDetails as Quizz} />
        ) : (
          <NotFound title={(quizzDetails as APIError)?.errorMsg as string} />
        )}
      </Container>
    </>
  );
};

export default QuizzPage;

QuizzPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const quizzID = context.params?.id;
  const quizzDetails = await fetchAPI({
    method: APIMethods.GET,
    id: quizzID as string,
    endpoint: APIEndpoints.getQuizz,
    errorMsg: GET_QUIZZ_DETAILS_ERROR,
  });

  return {
    props: {
      quizzDetails: quizzDetails?.result,
    },
    revalidate: 3600,
  };
};
