// React
import React, { ReactElement } from "react";
// Next
import dynamic from "next/dynamic";
// SEO messages
import { SEO_CREATE_QUIZZ_TITLE } from "@/messages/seo";
// API
import { fetchAPI } from "@/api/fetchAPI";
// INterfaces & Enums
import { APIEndpoints, APIMethods } from "@/ts/enums";
import { Question } from "@/ts/interfaces";
// Components
const PageHeading = dynamic(() => import("@/components/PageHeading"));
const PageSEO = dynamic(() => import("@/components/PageSEO"));
const QuizzDetails = dynamic(() => import("@/components/Forms/QuizzDetails"));
const Container = dynamic(() => import("@/components/Container"));
const Layout = dynamic(() => import("@/components/AppLayout"));

interface CreateQuizzPage {
  recycledQuestions: Question[];
}

const CreateQuizzPage = ({ recycledQuestions }: CreateQuizzPage) => {
  return (
    <>
      <PageSEO title={SEO_CREATE_QUIZZ_TITLE} />
      <PageHeading title="Create Quizz" />
      <Container>
        <QuizzDetails type="add" recycledQuestions={recycledQuestions} />
      </Container>
    </>
  );
};

export default CreateQuizzPage;

CreateQuizzPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getStaticProps = async () => {
  const recycledQuestions = await fetchAPI({
    method: APIMethods.GET,
    endpoint: APIEndpoints.getRecycledQuestions,
  });

  return {
    props: {
      recycledQuestions: recycledQuestions?.result?.map(
        (question: any) => question["0"]
      ),
      // Ovo sam morao uraditi na ovaj nacin jer mockup koji trenutno koristim ne sadrži funckiju da pusham array payload koij sadrzi questions i poreda te questions u value, ...payload, vec mi vraca za svaik objekat, question unutar njega. Tesko za objasniti...
    },
    revalidate: 3600,
  };
};
