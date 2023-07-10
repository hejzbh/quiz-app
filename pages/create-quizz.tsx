// React
import React, { ReactElement } from "react";
// Next
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
// SEO messages
import { SEO_CREATE_QUIZZ_TITLE } from "@/messages/seo";
// API
import { fetchAPI } from "@/api/fetchAPI";
// Interfaces & Enums
import { APIEndpoints, APIMethods } from "@/ts/enums";
import { Question } from "@/ts/interfaces";
import { getRecycledQuestions } from "@/utils/helpers";
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
  const router = useRouter();

  return (
    <>
      <PageSEO title={SEO_CREATE_QUIZZ_TITLE} />
      <PageHeading title="Create Quizz" />
      <Container>
        <QuizzDetails
          type="add"
          recycledQuestions={recycledQuestions}
          onSubmit={() => router.push("/")}
        />
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
      recycledQuestions:
        recycledQuestions?.result?.flatMap((question: any) =>
          getRecycledQuestions(question)
        ) || null,
      // Ovo sam morao uraditi na ovaj nacin jer mockup koji trenutno koristim ne sadrži funckiju da pusham array payload koij sadrzi questions i poreda te questions kao zaseebne objekte, ...payload, vec mi vraca za u jednom objektu sve questions pod brojevima 0, 1, 2, tj. po array indexs. Tesko za objasniti...
      // Ovo sam mogao sprijecit na nacin da mapiram questionse i da za svaki question pravim request da ga pusha na /questions api endpoint, ali to bi usporilo aplikaciju.
    },
    revalidate: 3600,
  };
};
