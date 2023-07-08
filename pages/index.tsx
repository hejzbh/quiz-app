// Next
import dynamic from "next/dynamic";
// API
import { fetchAPI } from "@/api/fetchAPI";
import { GET_QUIZZES_ERROR } from "@/api/errorMsg";
// SEO Messages
import { SEO_INDEX_TITLE } from "@/messages/seo";
// Interface & Types & Enums
import { APIError, Quizz } from "@/ts/interfaces";
import { APIMethods, APIEndpoints } from "@/ts/enums";
// Components
const PageHeading = dynamic(() => import("@/components/PageHeading"));
const Quizzes = dynamic(() => import("@/components/Quizzes"));
const PageSEO = dynamic(() => import("@/components/PageSEO"));

interface HomeProps {
  quizzes:
    | {
        result: Quizz[] | null;
      }
    | APIError;
}

export default function Home({ quizzes }: HomeProps) {
  return (
    <>
      <PageSEO title={SEO_INDEX_TITLE} />
      <PageHeading title="Quiz app" description="Have a fun!" />
      <Quizzes
        quizzes={quizzes?.result as Quizz[]}
        errorMsg={(quizzes as APIError)?.errorMsg}
      />
    </>
  );
}

export const getStaticProps = async () => {
  // Get quizzes from API
  const quizzes = await fetchAPI({
    method: APIMethods.GET,
    endpoint: APIEndpoints.getQuizzes,
    errorMsg: GET_QUIZZES_ERROR, //In case error happened, which message will be returned from function?
  });

  // Return results (this props will be available in Home props)
  return {
    props: {
      quizzes,
    },
    revalidate: 3600,
  };
};
