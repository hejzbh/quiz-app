// React
import React, { ReactElement } from "react";
// Next
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { GetStaticPropsContext } from "next";
// SEO messages
import { SEO_EDIT_QUIZZ } from "@/messages/seo";
// Error messages
import { GET_QUIZZ_DETAILS_ERROR } from "@/messages/errors";
// API
import { fetchAPI } from "@/api/fetchAPI";
// Enums & Interfaces
import { APIEndpoints, APIMethods } from "@/ts/enums";
import { APIError, Question, Quizz } from "@/ts/interfaces";
// Components
const PageHeading = dynamic(() => import("@/components/PageHeading"));
const PageSEO = dynamic(() => import("@/components/PageSEO"));
const QuizzDetails = dynamic(() => import("@/components/Forms/QuizzDetails"));
const Container = dynamic(() => import("@/components/Container"));
const NotFound = dynamic(() => import("@/components/NoResultsFound"));
const Layout = dynamic(() => import("@/components/AppLayout"));

interface QuizzPageProps {
  quizzDetails: Quizz | APIError;
  recycledQuestions: Question[];
}

const QuizzPage = ({ quizzDetails, recycledQuestions }: QuizzPageProps) => {
  const router = useRouter();

  return (
    <>
      <PageSEO title={(quizzDetails as Quizz)?.name || SEO_EDIT_QUIZZ} />
      <PageHeading title={(quizzDetails as Quizz)?.name || "Not found"} />
      <Container>
        {/** If we got correct quizz details render QuizzDetails component, otherwise render not found */}
        {(quizzDetails as Quizz)?.id ? (
          <QuizzDetails
            type="edit"
            data={quizzDetails as Quizz}
            onSubmit={() => router.replace(router.asPath)}
            recycledQuestions={recycledQuestions}
          />
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
  const [quizzDetails, recycledQuestions] = await Promise.all([
    fetchAPI({
      method: APIMethods.GET,
      id: quizzID as string,
      endpoint: APIEndpoints.getQuizz,
      errorMsg: GET_QUIZZ_DETAILS_ERROR,
    }),
    fetchAPI({
      method: APIMethods.GET,
      endpoint: APIEndpoints.getRecycledQuestions,
    }),
  ]);

  return {
    props: {
      quizzDetails: quizzDetails?.result,
      recycledQuestions: recycledQuestions?.result?.map(
        (question: any) => question["0"]
      ),
      // Ovo sam morao uraditi na ovaj nacin jer mockup koji trenutno koristim ne sadrži funckiju da pusham array payload koij sadrzi questions i poreda te questions u value, ...payload, vec mi vraca za svaik objekat, question unutar njega. Tesko za objasniti...
    },
    revalidate: 3600,
  };
};
