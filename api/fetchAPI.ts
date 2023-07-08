// NPM Packages
import axios from "axios";
// Interface & Types
import { FetchAPIParams, APIError } from "@/ts/interfaces";

export const fetchAPI = async ({
  method,
  endpoint,
  id,
  data,
  errorMsg,
}: FetchAPIParams) => {
  try {
    console.log(data);
    console.log("haa");
    const { data: apiResult } = await axios({
      method: method,
      url: process?.env?.NEXT_PUBLIC_API_URL + endpoint + (id ? id : ""),
      ...(data ? { data } : {}),
    });

    return {
      result: apiResult,
    };
  } catch (err: any) {
    return {
      result: null,
      errorMsg: errorMsg || err?.message,
    } as APIError;
  }
};
